import { intro, outro, spinner } from "@clack/prompts";
import { init as initGit } from "../git.js";
import exec from "../exec.js";

export const NewPythonProject = async (option: { name: string, git: boolean }) => {
  const s = spinner();
  const { name, git } = option;

  intro("Initializing Python project");

  if (git) {
    s.start("Initializing Git");

    await exec(`git`, [`init`]);
    await exec(`git`, [`branch`, `-M`, `main`]);
    await exec(`git`, [`add`, `.`]);
    await exec(`git`, [`commit`, `-m`, `🎉 Initial Commit`]);

    s.stop("Git Initialized");
  }

  outro("Python project initialized")
}