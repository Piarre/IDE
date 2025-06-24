import type { JSON } from "@/types";
import { editJSON, exec } from "./utils";
import { join } from "path";
import { homedir } from "os";
import { mkdir } from "node:fs/promises";

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

const checkHomedir = async () => {
  const templateFolder = join(homedir(), ".ide");

  if (!(await Bun.file(templateFolder).exists())) await mkdir(templateFolder, { recursive: true });

  const glob = new Bun.Glob(`${templateFolder}/*.{yml,yaml}`);

  const filesExist = await Array.fromAsync(await glob.scan(".")).then((files) => files.length > 0);

  if (!filesExist) {
    console.error(
      `No valid templates found in "${templateFolder}". Please add a valid template to continue.`,
    );
    process.exit(1);
  }
};

const executeCommands = (commands: string | string[], projectPath: string) =>
  (Array.isArray(commands) ? commands : [commands]).forEach((cmd) => exec(cmd, projectPath));

export { editJSONs, executeCommands, checkHomedir };
