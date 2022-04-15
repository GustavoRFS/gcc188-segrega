import path from "path";
import fs from "fs";

export const createUploadsFolder = () => {
  const folderPath = path.join(__dirname, "../../uploads");

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
};

export const saveFile = (
  buffer: Buffer,
  filename: string
): Promise<string | NodeJS.ErrnoException> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      path.join(__dirname, "../../uploads/", filename),
      buffer,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(filename);
        }
      }
    );
  });
};
