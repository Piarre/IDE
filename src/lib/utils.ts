import { join } from "path";
import { homedir } from "os";
import { mkdir } from "node:fs/promises";

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

const checkHomedir = async () => {
  const templateFolder = join(homedir(), ".ide");

  if (!await Bun.file(templateFolder).exists()) await mkdir(templateFolder, { recursive: true });

  const glob = new Bun.Glob(`${templateFolder}/*.{yml,yaml}`);

  const filesExist = await Array.fromAsync(glob.scan(".")).then((files) => files.length > 0);

  if (!filesExist) {
    console.error(`No valid templates found in "${templateFolder}". Please add a valid template to continue.`);
    process.exit(1);
  }
};

export { exec, editJSON, checkHomedir };
