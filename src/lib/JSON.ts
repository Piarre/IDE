import * as fs from "fs";
import path from "path";

/**
 * Modifies a JSON file by changing the value of a specified key.
 *
 * @param {string} filePath - The path to the JSON file to modify.
 * @param {string} key - The key in the JSON file whose value should be changed.
 * @param {string | Object} newValue - The new value to set for the specified key.
 * @param {Object} [options] - Optional parameters.
 * @param {string} [options.cwd] - The current working directory. If specified, the `filePath` is considered relative to this directory.
 * @throws Will throw an error if the JSON file cannot be read or written, or if the specified key does not exist in the JSON file.
 */
const modifyJSON = (filePath: string, key: string, newValue: string | Object, options?: { cwd: string }): void => {
  try {
    const absoluteFilePath = options?.cwd ? path.join(options.cwd, filePath) : filePath;
    const jsonData = JSON.parse(fs.readFileSync(absoluteFilePath, "utf-8"));

    if (jsonData.hasOwnProperty(key)) {
      jsonData[key] = newValue;
      fs.writeFileSync(absoluteFilePath, JSON.stringify(jsonData, null, 2), {
        encoding: "utf-8"
      });
    }
  } catch (error) {
    console.error((error as Error).message);
  }
};

export default modifyJSON;