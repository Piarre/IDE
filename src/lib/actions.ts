import { dirname, join } from "path";
import { exec, editJSON } from "./utils.js";
import { mkdirSync, writeFileSync } from "fs";
import { JSON } from "../@types/index.js";

const runCommand = async (cmd: string[] | undefined, path: string) => {
  for (let command of cmd ?? []) {
    const { stdout, stderr } = await exec(command, path);

    console.log(stdout);
    console.log(stderr);
  }
};

const writeFile = async (files: any, path: string, option: any) => {
  for (let file of files ?? []) {
    const filePath = join(path, file.path);
    const fileContent = file.content ?? "";
    console.log(filePath);
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(
      filePath,
      fileContent.replace(/{{ .* }}/g, (match: string) => option[match.slice(3, -3)]),
    );
  }
};

const editJSONs = (JSON: JSON[] | undefined, path: string, option: any) => {
  for (let json of JSON ?? []) {
    const filePath = join(path, json.path);

    editJSON(
      filePath,
      json.key,
      json.value.replace(/{{ .* }}/g, (match) => option[match.slice(3, -3)]),
    );
  }
};

export { runCommand, writeFile, editJSONs };
