import { execa } from "execa";

/**
 * Executes a shell command asynchronously.
 *
 * @async
 * @param {string} command - The command to execute.
 * @param {string[]} args - The arguments to pass to the command.
 * @param {string} [path] - The path in which to execute the command. If not specified, the command is executed in the current working directory.
 * @returns {Promise<any>} A promise that resolves to the result of the command.
 * @throws {Error} Will throw an error if the command fails to execute.
 */
const exec = async (command: string, args: string[], path?: string): Promise<any> => await execa(command, args, { cwd: path ?? process.cwd() });

export default exec;