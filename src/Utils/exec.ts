import { execSync } from "child_process";
import { execa } from "execa";

const exec = async (command: string, args: any[] | string[], path?: string) => await execa(command, args, { cwd: path ?? process.cwd() });

export default exec;