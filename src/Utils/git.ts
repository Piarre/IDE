import fs from "fs";
import path from "path";
import GITIGNORE from "../Constants/GITIGNORE.js";
import { spinner } from "@clack/prompts";
import exec from "./exec.js";

/**
 * Initializes a new Git repository in the specified project path.
 *
 * @async
 * @param {string} projectPath - The path of the project where the Git repository should be initialized.
 * @throws Will throw an error if the Git commands fail to execute or if the .gitignore file cannot be written.
 */
export const init = async (projectPath: string) => {
  const s = spinner();

  s.start("Initializing Git");

  await exec(`git`, [`init`]);
  fs.writeFileSync(path.join(projectPath, ".gitignore"), GITIGNORE);
  await exec(`git`, [`branch`, `-M`, `main`]);
  await exec(`git`, [`add`, `.`]);
  await exec(`git`, [`commit`, `-m`, `🎉 Initial Commit`]);

  s.stop("Git Initialized");
};