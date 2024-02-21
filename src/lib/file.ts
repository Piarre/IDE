import * as fsPromises from "fs/promises";
import { outro } from "@clack/prompts";
import * as fs from "fs";
import path from "path";

/**
 * Creates a new directory.
 *
 * @param {string} path - The path where the new directory should be created.
 * @returns {boolean} Returns `true` if the directory was successfully created, and `false` if the directory already exists.
 * @throws Will throw an error if the directory cannot be created due to insufficient permissions or other I/O error.
 */
export const mkdir = (path: string): boolean => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    return true;
  } else {
    return false;
  }
};

/**
 * Recursively removes a directory and its contents.
 *
 * @async
 * @param {string} pathToDelete - The path of the directory to remove.
 * @throws Will throw an error if the directory does not exist or an I/O error occurs.
 */
export const rmdir = async (pathToDelete: string): Promise<void> => {
  if (fs.existsSync(pathToDelete)) {
    const files = fs.readdirSync(pathToDelete);

    files.forEach((file) => {
      const filePath = path.join(pathToDelete, file);

      if (fs.statSync(filePath).isDirectory()) {
        rmdir(filePath).catch((error) => error);
      } else {
        fs.unlinkSync(filePath);
      }
    });

    fs.rmdirSync(pathToDelete);
  }
}

/**
 * Checks if a directory is empty.
 *
 * @async
 * @param {string} path - The path of the directory to check.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the directory is empty, and `false` otherwise.
 * @throws Will throw an error if the directory does not exist or an I/O error occurs.
 */
export const isEmpty = async (path: string): Promise<boolean> => {
  try {
    const files = await fsPromises.readdir(path);

    return files.length === 0;
  } catch (error) {
    return false;
  }
};