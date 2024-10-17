/* eslint-disable @typescript-eslint/no-explicit-any */
import { createWriteStream, rename } from 'fs';
import { Transform } from 'stream';
import Logger from './Shared/Logger';


export class CSVWriter {
  private writeStream: NodeJS.WritableStream;
  private firstRow: boolean = true;
  private batchSize: number = 5000;
  private logger: Logger | null;
  private tempFilePath: string;
  private finalFilePath: string;

  constructor(filePath: string, name:string,logger: Logger|null) {
    this.finalFilePath = `${filePath}/${name}.csv`;
    this.tempFilePath = `${filePath}/.${name}.csv`; // Hidden temporary file
    this.writeStream = createWriteStream(this.tempFilePath, { flags: 'a' });
    this.logger = logger;
    this.logger?.log(`CSVWriter initialized with temp file: ${this.tempFilePath}`);
  }

  /**
   * Convert object to CSV line
   */
  private objectToCSVLine(obj: object): string {
    return Object.values(obj).map(value => {
      if (value === null || value === undefined) return '""';
      if (typeof value === 'object') return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
      if (typeof value === 'string') return `"${value.replace(/"/g, '""')}"`;
      if (typeof value === 'boolean') return value ? 'true' : 'false';
      return value;
    }).join(',') + '\n';
  }

  /**
   * Write headers based on object keys
   */
  private writeHeaders(data: object): void {
    if (this.firstRow) {
      const headers = Object.keys(data).join(',') + '\n';
      this.writeStream.write(headers);
      this.firstRow = false;
      this.logger?.log('Headers written to CSV file');
    }
  }

  /**
   * Write data array to CSV
   */
  public async writeData(data: any[]): Promise<void> {
    this.logger?.log(`Writing ${data.length} records to CSV`);
    return new Promise((resolve, reject) => {
      try {
        // Write headers if first row and data exists
        if (data.length > 0) {
          this.writeHeaders(data[0]);
        }

        // Create transform stream
        const transformStream = new Transform({
          objectMode: true,
          transform: (chunk: any, _encoding, callback) => {
            const csvLine = this.objectToCSVLine(chunk);
            callback(null, csvLine);
          }
        });

        // Pipe transform stream to write stream
        transformStream.pipe(this.writeStream, { end: false });

        // Process data in batches
        let processedCount = 0;
        
        const processBatch = () => {
          const batch = data.slice(
            processedCount,
            processedCount + this.batchSize
          );

          if (batch.length === 0) {
            transformStream.end();
            resolve();
            this.logger?.log('All data written to CSV');
            return;
          }

          let canContinue = true;
          batch.forEach(item => {
            canContinue = transformStream.write(item);
          });

          processedCount += batch.length;

          if (canContinue) {
            setImmediate(processBatch);
          } else {
            transformStream.once('drain', processBatch);
          }
        };

        processBatch();

      } catch (error) {
        this.logger?.error(`Error writing data: ${error}`);
        reject(error);
      }
    });
  }

  /**
   * Write multiple arrays
   */
  public async writeArrays(dataArrays: any[][]): Promise<void> {
    for (const dataArray of dataArrays) {
      await this.writeData(dataArray);
    }
  }

  /**
   * Set batch size for memory optimization
   */
  public setBatchSize(size: number): void {
    this.batchSize = size;
    this.logger?.log(`Batch size set to ${size}`);
  }

  /**
   * Close the write stream and rename file
   */
  public async close(): Promise<void> {
    this.logger?.log('Closing write stream');
    return new Promise((resolve, reject) => {
      this.writeStream.end();
      
      this.writeStream
        .on('finish', () => {
          // Rename temp file to final file
          rename(this.tempFilePath, this.finalFilePath, (err) => {
            if (err) {
              this.logger?.error(`Error renaming file: ${err}`);
              reject(err);
            } else {
              this.logger?.log(`File renamed to ${this.finalFilePath}`);
              resolve();
            }
          });
        })
        .on('error', (err) => {
          this.logger?.error(`Error closing write stream: ${err}`);
          reject(err);
        });
    });
  }
}
