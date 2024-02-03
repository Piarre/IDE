import fs from "fs";
import path from "path";
import { spinner } from "@clack/prompts";
import exec from "./exec.js";

/**
 * Initializes a new Git repository in the specified project path.
 *
 * @async
 * @param {string} projectPath - The path of the project where the Git repository should be initialized.
 * @param {string} ignore - The contents of the .gitignore file.
 * @param {License} license - The license to be used for the project.
 * @throws Will throw an error if the Git commands fail to execute or if the .gitignore file cannot be written.
 */
export const init = async (projectPath: string, ignore: string) => {
  const s = spinner();

  s.start("Initializing Git");
  
  fs.writeFileSync(path.join(projectPath, ".gitignore"), ignore);

  await exec(`git`, [`init`], projectPath);
  await exec(`git`, [`branch`, `-M`, `main`], projectPath);
  await exec(`git`, [`add`, `.`], projectPath);
  await exec(`git`, [`commit`, `-m`, `🎉 Initial Commit`], projectPath);

  s.stop("Git Initialized");
};
