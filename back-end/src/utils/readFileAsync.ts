import fs from "fs";

export const readFileAsync = (filepath: string) =>
  new Promise<Buffer>((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
