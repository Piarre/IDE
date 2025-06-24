import type { JSON } from "@/types";
import { editJSON, exec } from "./utils";
import { join } from "path";

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

const executeCommands = (commands: string | string[], projectPath: string) =>
  (Array.isArray(commands) ? commands : [commands]).forEach((cmd) => exec(cmd, projectPath));

export { editJSONs, executeCommands };
