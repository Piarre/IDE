import * as fsPromises from "fs/promises";
import { outro } from "@clack/prompts";
import * as fs from "fs";
import path from "path";

export const mkdir = (path: string): boolean => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    return true;
  } else {
    return false;
  }
};

export const rmdir = async (pathToDelete: string) => {
  if (fs.existsSync(pathToDelete)) {
    const files = fs.readdirSync(pathToDelete);

    files.forEach((fichier) => {
      const cheminFichier = path.join(pathToDelete, fichier);

      if (fs.statSync(cheminFichier).isDirectory()) {
        rmdir(cheminFichier).catch((error) => error);
      } else {
        fs.unlinkSync(cheminFichier);
      }
    });

    fs.rmdirSync(pathToDelete);
  }
};

export const isEmpty = async (path: string): Promise<boolean> => {
  try {
    const files = await fsPromises.readdir(path);

    return files.length === 0;
  } catch (error) {
    return false;
  }
};