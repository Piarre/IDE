import * as fs from "fs";
import { execa } from "execa";
import { join } from "path";
import { homedir } from "os";

const exec = async (command: string, cwd?: string | URL) =>
  await execa(command, { cwd, encoding: "utf8", shell: true });

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
const editJSON = (
  filePath: string,
  key: string,
  newValue: string | Object,
  options?: { cwd: string },
): void => {
  try {
    const absoluteFilePath = options?.cwd ? join(options.cwd, filePath) : filePath;
    const jsonData = JSON.parse(fs.readFileSync(absoluteFilePath, "utf-8"));

    if (jsonData.hasOwnProperty(key)) {
      jsonData[key] = newValue;
      fs.writeFileSync(absoluteFilePath, JSON.stringify(jsonData, null, 2), {
        encoding: "utf-8",
      });
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
  }
};

const checkHomedir = () => {
  const templateFolder = join(homedir(), ".ide");

  if (!fs.existsSync(templateFolder)) fs.mkdirSync(templateFolder);

  const templateFiles = fs.readdirSync(templateFolder);

  if (!templateFiles.some((file) => file.endsWith(".yml") || file.endsWith(".yaml"))) {
    console.error(
      `No valid templates found in "${templateFolder}". Please add a valid template to continue.`,
    );
    process.exit(1);
  }
};

export { exec, editJSON, checkHomedir };
