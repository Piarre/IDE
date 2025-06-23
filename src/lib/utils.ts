import { join, dirname } from "path";
import { homedir } from "os";
import { mkdir } from "node:fs/promises";
import highlight from "cli-highlight";

const exec = async (command: string, cwd?: string) =>
  Bun.$`${{
    raw: command,
  }}`
    .cwd(cwd || process.cwd())
    .nothrow()
    .quiet();

const editJSON = async (
  filePath: string,
  key: string,
  newValue: string | Object,
  options?: { cwd: string }
): Promise<void> => {
  try {
    const absoluteFilePath = options?.cwd ? join(options.cwd, filePath) : filePath;
    const file = await Bun.file(absoluteFilePath).json();
    const jsonData = JSON.parse(file);

    if (jsonData.hasOwnProperty(key)) {
      jsonData[key] = newValue;
      Bun.write(absoluteFilePath, JSON.stringify(jsonData, null, 2));
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
  }
};

const writeFiles = async (files: any, path: string, option: any) => {
  for (let file of files ?? []) {
    const filePath = join(path, file.path);
    const fileContent = file.content ?? "";
    await mkdir(dirname(filePath), { recursive: true });
    await Bun.write(
      filePath,
      fileContent.replace(/{{ .* }}/g, (match: string) => option[match.slice(3, -3)])
    );
  }
};

const checkHomedir = async () => {
  const templateFolder = join(homedir(), ".ide");

  if (!(await Bun.file(templateFolder).exists())) await mkdir(templateFolder, { recursive: true });

  const glob = new Bun.Glob(`${templateFolder}/*.{yml,yaml}`);

  const filesExist = await Array.fromAsync(await glob.scan(".")).then((files) => files.length > 0);

  if (!filesExist) {
    console.error(`No valid templates found in "${templateFolder}". Please add a valid template to continue.`);
    process.exit(1);
  }
};
``;

const displayFile = (content: string, language: string = "yml") => {
  return console.log(highlight(content, {
    language: "yaml",
    theme: {
      comment: (x) => `\x1b[90m${x}\x1b[0m`,
      string: (x) => `\x1b[32m${x}\x1b[0m`,
      number: (x) => `\x1b[33m${x}\x1b[0m`,
      attr: (x) => `\x1b[31m${x}\x1b[0m`,
    },
  }));
};

export { exec, editJSON, checkHomedir, writeFiles, displayFile };
