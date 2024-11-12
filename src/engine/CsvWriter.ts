/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWriteStream, rename } from "fs";
import { Transform } from "stream";
import Logger from "./Shared/Logger";

export class CSVWriter {
  private writeStream: NodeJS.WritableStream;
  private headers: string[] = [];
  private batchSize: number = 5000;
  private logger: Logger | null;
  private tempFilePath: string;
  private finalFilePath: string;
  private readonly bufferSize: number = 16384; // 16KB buffer for better performance

  constructor(
    filePath: string,
    name: string,
    logger: Logger | null,
    // type: ContentType
  ) {
    this.finalFilePath = `${filePath}/${name}.csv`;
    this.tempFilePath = `${filePath}/.${name}.csv`;
    this.writeStream = createWriteStream(this.tempFilePath, {
      flags: "a",
      highWaterMark: this.bufferSize,
    });
    this.logger = logger;
    this.logger?.log(
      `CSVWriter initialized with temp file: ${this.tempFilePath}`
    );
  }

  /**
   * Safely escape and format CSV value
   */
  private escapeCSVValue(value: any): string {
    if (value === null || value === undefined) {
      return '""';
    }

    const stringValue =
      typeof value === "object" ? JSON.stringify(value) : String(value);

    // Double escape quotes and wrap in quotes if needed
    if (
      stringValue.includes('"') ||
      stringValue.includes(",") ||
      stringValue.includes("\n")
    ) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
  }

  /**
   * Convert object to CSV line ensuring header order
   */
  private objectToCSVLine(obj: Record<string, any>): string {
    return (
      this.headers.map((header) => this.escapeCSVValue(obj[header])).join(",") +
      "\n"
    );
  }

  /**
   * Write headers and store them for future reference
   */
  private writeHeaders(data: Record<string, any>): void {
    if (this.headers.length === 0) {
      this.headers = Object.keys(data);
      const headerLine =
        this.headers.map((header) => this.escapeCSVValue(header)).join(",") +
        "\n";

      this.writeStream.write(headerLine);
      this.logger?.log("Headers written to CSV file");
    }
  }

  /**
   * Write data array to CSV with optimized streaming
   */
  public async writeData(data: Record<string, any>[]): Promise<void> {
    if (!Array.isArray(data) || data.length === 0) {
      return;
    }

    this.logger?.log(`Writing ${data.length} records to CSV`);

    return new Promise((resolve, reject) => {
      try {
        this.writeHeaders(data[0]);

        const transformStream = new Transform({
          objectMode: true,
          transform: (chunk: Record<string, any>, _encoding, callback) => {
            try {
              const csvLine = this.objectToCSVLine(chunk);
              callback(null, csvLine);
            } catch (error: unknown) {
              callback(error as Error);
            }
          },
          highWaterMark: this.batchSize,
        });

        transformStream.pipe(this.writeStream, { end: false });

        let processedCount = 0;

        const processBatch = () => {
          const batch = data.slice(
            processedCount,
            processedCount + this.batchSize
          );

          if (batch.length === 0) {
            transformStream.end();
            resolve();
            this.logger?.log("All data written to CSV");
            return;
          }

          const canContinue = batch.every((item) =>
            transformStream.write(item)
          );
          processedCount += batch.length;

          if (canContinue) {
            setImmediate(processBatch);
          } else {
            transformStream.once("drain", processBatch);
          }
        };

        transformStream.on("error", (error) => {
          this.logger?.error(`Transform stream error: ${error}`);
          reject(error);
        });

        processBatch();
      } catch (error) {
        this.logger?.error(`Error writing data: ${error}`);
        reject(error);
      }
    });
  }

  /**
   * Write multiple arrays with improved error handling
   */
  public async writeArrays(dataArrays: Record<string, any>[][]): Promise<void> {
    try {
      for (const dataArray of dataArrays) {
        await this.writeData(dataArray);
      }
    } catch (error) {
      this.logger?.error(`Error writing arrays: ${error}`);
      throw error;
    }
  }

  /**
   * Set batch size with validation
   */
  public setBatchSize(size: number): void {
    if (size < 1) {
      throw new Error("Batch size must be greater than 0");
    }
    this.batchSize = size;
    this.logger?.log(`Batch size set to ${size}`);
  }

  /**
   * Close the write stream and rename file with proper cleanup
   */
  public async close(): Promise<void> {
    this.logger?.log("Closing write stream");
    return new Promise((resolve, reject) => {
      const cleanup = (error?: Error) => {
        this.headers = [];
        if (error) {
          this.logger?.error(`Error during close: ${error}`);
          reject(error);
        } else {
          resolve();
        }
      };

      this.writeStream.end(() => {
        rename(this.tempFilePath, this.finalFilePath, (err) => {
          if (err) {
            cleanup(err);
          } else {
            this.logger?.log(`File renamed to ${this.finalFilePath}`);
            cleanup();
          }
        });
      });

      this.writeStream.on("error", cleanup);
    });
  }
}
