import * as fs from "fs";
import path from "path";

const modifyJSON = (filePath: string, key: string, newValue: string | Object, options?: { cwd: string }) => {
  try {
    const absoluteFilePath = options?.cwd ? path.join(options.cwd, filePath) : filePath;
    const jsonData = JSON.parse(fs.readFileSync(absoluteFilePath, "utf-8"));

    if (jsonData.hasOwnProperty(key)) {
      jsonData[key] = newValue;
      fs.writeFileSync(absoluteFilePath, JSON.stringify(jsonData, null, 2));
    }
  } catch (error) {
    console.error((error as Error).message);
  }
};

export default modifyJSON;