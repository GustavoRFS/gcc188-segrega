import path from "path";
import fs from "fs";

export const createUploadsFolder = () => {
  const folderPath = path.join(__dirname, "../../uploads");

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
};
