import { TypeScriptProject } from "../../types.js";
import { intro, outro, spinner, text } from "@clack/prompts";
import { execa } from "execa";
import * as fs from "fs";
import modifyJSON from "../JSON.js";
import path from "path";
import { isEmpty, mkdir } from "../file.js";
import GITIGNORE from "../../Constants/GITIGNORE.js";

export const init = async (project: TypeScriptProject) => {
  const s = spinner();
  const { name, author, description, license, git, dependencies, devDependencies } = project;

  let finalName = name;

  intro("🎉 Initializing TypeScript Project");

  if (!name) {
    const newName = await text({
      message: "Project name",
      placeholder: "my-project"
    });

    finalName = newName as string;
  }

  const projectPath = path.join(process.cwd(), finalName);

  const exec = async (command: string, args: any[] | string[]) => await execa(command, args, { cwd: projectPath });
  const pkg = (key: string, newValue: string | Object) => modifyJSON("package.json", key, newValue, { cwd: projectPath });

  if (!mkdir(projectPath)) {
    outro("🥅 Project already exists");
    return process.exit(0);
  }

  s.start(`Creating ${finalName} v0.0.1`);

  await exec("npm", ["init", "-y"]);

  description && pkg("description", description);
  author && pkg("author", author);

  pkg("main", "out/index.js");
  pkg("version", "0.0.1");
  pkg("scripts", {
    "dev": "tsc -w",
    "build": "tsup",
    "clear": "rm -rf out/",
    "start": "tsc && node .",
    "start:clean": "rm -rf out && tsc && node ."
  });

  fs.mkdirSync(path.join(projectPath, "src"), { recursive: true });
  fs.writeFileSync(path.join(projectPath, "src", "index.ts"), `console.log("Hello World!");`);
  fs.writeFileSync(path.join(projectPath, "tsup.config.ts"),
    `
import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
});
`);

  s.stop("Project created");
  s.start("Installing dependencies");

  await exec("npm", ["i", "-D", "typescript", "@types/node", "tsup"]);

  s.stop("Dependencies installed");

  if (devDependencies || dependencies) {
    s.start("Installing additional dependencies");

    try {
      dependencies && await exec(`npm`, [`i`, `-D`, ...dependencies]);
      devDependencies && await exec(`npm`, [`i`, `-D`, ...devDependencies]);

      s.stop("Additional dependencies installed");
    } catch (error) {
      console.error("Error installing dependencies:\n", (error as Error).message);
      s.stop("Error installing additional dependencies");
    }
  }

  if (git) {
    s.start("Initializing Git");

    await exec(`git`, [`init`]);
    fs.writeFileSync(path.join(projectPath, ".gitignore"), GITIGNORE);
    await exec(`git`, [`branch`, `-M`, `main`]);
    await exec(`git`, [`add`, `.`]);
    await exec(`git`, [`commit`, `-m`, `🎉 Initial Commit`]);

    s.stop("Git Initialized");
  }

  outro(`🎉 Project ${finalName} created`);
};