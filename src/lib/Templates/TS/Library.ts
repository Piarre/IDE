import { intro, outro, spinner, text } from "@clack/prompts";
import { execa } from "execa";
import * as fs from "fs";
import path from "path";
import { mkdir } from "@/lib/file.js";
import { TTSProject } from "@/@types/Project.js";
import modifyJSON from "@/lib/JSON.js";
import { init } from "@/lib/git.js";
import TSIgnore from "@/lib/Ignores/TS.js";

export const NewTSLib = async (project: TTSProject) => {
  const s = spinner();
  const { name, author, description, license, git, dependencies, devDependencies, noInstall } = project;

  let finalName = name;
  let newName;

  intro("🎉 Initializing TypeScript Library");

  if (!name) {
    while (!newName) {
      newName = await text({
        message: "Project name",
        placeholder: "my-project",
      });
    }

    finalName = newName as string;
  }

  const projectPath = path.join(process.cwd(), finalName);

  const exec = async (command: string, args: any[] | string[]) =>
    await execa(command, args, { cwd: projectPath });
  const pkg = (key: string, newValue: string | Object) =>
    modifyJSON("package.json", key, newValue, { cwd: projectPath });

  if (!mkdir(projectPath)) {
    outro("🥅 Project already exists");
    return process.exit(0);
  }

  s.start(`Creating ${finalName} 1.0.0`);

  await exec("npm", ["init", "-y"]);

  description && pkg("description", description);
  author && pkg("author", author);

  pkg("main", "out/index.js");
  pkg("scripts", {
    dev: "tsc -w",
    build: "tsup",
    clear: "rm -rf out/",
    start: "tsc && node .",
    "start:clean": "rm -rf out && tsc && node .",
  });

  fs.mkdirSync(path.join(projectPath, "src"), { recursive: true });
  fs.writeFileSync(path.join(projectPath, "src", "index.ts"), `console.log("Hello World!");`);
  fs.writeFileSync(
    path.join(projectPath, "tsup.config.ts"),
    `
import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/**/*.ts"],
  format: ["cjs", "esm"],
  outDir: "out",
  dts: true,
  clean: true,
  target: "es6",
});
`
  );
  fs.writeFileSync(
    path.join(projectPath, "tsconfig.json"),
    `
{
  "compilerOptions": {
    "module": "CommonJS",
    "target": "ES6",
    "declaration": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "outDir": "./out",
    "baseUrl": "./",
    "typeRoots": ["./node_modules/@types", "src/types/*.d.ts"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "tests"]
}
`
  );

  s.stop("Project created");
  s.start("Installing dependencies");

  await exec("npm", ["i", "-D", "typescript", "@types/node", "tsup", "ts-node", "vitest"]);

  s.stop("Dependencies installed");

  if ((devDependencies || dependencies) && !noInstall) {
    s.start("Installing additional dependencies");

    try {
      dependencies && (await exec(`npm`, [`i`, `-D`, ...dependencies]));
      devDependencies && (await exec(`npm`, [`i`, `-D`, ...devDependencies]));

      s.stop("Additional dependencies installed");
    } catch (error) {
      console.error("Error installing dependencies:\n", (error as Error).message);
      s.stop("Error installing additional dependencies");
    }
  }

  await init(projectPath, project.ignore);

  s.start("Initializing Git");

  git && init(projectPath, TSIgnore);

  s.stop("Git Initialized");

  outro(`🎉 Library ${finalName} created`);
};
