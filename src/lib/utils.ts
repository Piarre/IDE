import { execa } from "execa";

const exec = async (command: string, cwd?: string | URL) => await execa(command, { cwd });

export { exec };
