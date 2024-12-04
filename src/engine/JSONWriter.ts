import fs from "fs";
import path from "path";
import Logger from "./Shared/Logger";

class JSONWriter {
  private writeStream: fs.WriteStream;
  private isOpen = false;
  private prev = false;
  private FIlename: string;
  private logger: Logger | null;

  constructor(filePath: string, filename: string, logger: Logger | null) {
    // Create directory if it doesn't exist
    fs.mkdirSync(filePath, { recursive: true });

    this.FIlename = path.join(
      filePath,
      `${filename.replace(/[^a-zA-Z0-9]/g, "_")}.json`
    );

    const tempFilePath = path.join(filePath, `.${filename}`);
    this.writeStream = fs.createWriteStream(tempFilePath);
    this.writeStream.write('[');
    this.isOpen = true;
    this.logger = logger;
    this.logger?.warn(`temp file created in ${this.writeStream.path}`);
  }

  writeHeader(data: string) {
    if (!this.isOpen) {
      throw new Error("JSONWriter is closed. Cannot append data.");
    }

    this.writeStream.write(`${data},\n"data": [`);
  }

  appendData(data: unknown) {
    if (!this.isOpen) {
      throw new Error("JSONWriter is closed. Cannot append data.");
    }

    const dataArray = Array.isArray(data) ? data : [data];
    dataArray.forEach((item, index) => {
      if (index > 0 || this.prev) {
        this.writeStream.write(",\n");
      }
      this.writeStream.write(JSON.stringify(item, null, 2));
    });
    this.prev = true;
  }

  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.isOpen) {
        resolve();
        return;
      }

      this.writeStream.write("\n]");
      console.log("write end");

      this.writeStream.end(() => {
        const tempFile = this.writeStream.path as string;
        fs.copyFile(tempFile, this.FIlename, (err) => {
          if (err) {
            this.logger?.error(`Error copying file: ${err}`);
            reject(err);
            return;
          }

          fs.unlink(tempFile, (unlinkErr) => {
            if (unlinkErr) {
              this.logger?.error(`Error deleting temporary file: ${unlinkErr}`);
              reject(unlinkErr);
              return;
            }

            this.logger?.warn(
              `temp file in <br/> ${this.writeStream.path} moved to <br/> ${this.FIlename}`
            );
            this.isOpen = false;
            resolve();
          });
        });
      });
    });
  }
}

export default JSONWriter;
