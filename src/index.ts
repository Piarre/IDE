import { Command } from "commander";
import licenser from "./lib/license.js";
import { TNextProject, TTSProject } from "./@types/Project.js";
import { NewCProject, NewNextProject, NewTSLib, NewTSProject } from "./lib/Templates/index.js";

export const IDE = new Command();

IDE.version("1.0.0");

const TS = new Command("ts").description("TypeScript, NextJS or TS Library");

TS.option("-n, --name <name>", "Project name")
  .option("-d, --description <description>", "Project description")
  .option("-a, --author <author>", "Project author")
  .option("-l, --license <license>", "Project license")
  .option("-g, --git", "Initialize git repository")
  .option("--noInstall", "Skip dependencies installation")
  .option("-dep, --dependencies [dependencies...]", "Additional dependencies")
  .option("-D, --devDependencies [devDependencies...]", "Additional development dependencies")
  .description("Initialize a new TypeScript project (typescript, @types/node, tsup)")
  .action(async (option: TTSProject) => await NewTSProject(option));

TS.command("lib")
  .option("-n, --name <name>", "Project name")
  .option("-d, --description <description>", "Project description")
  .option("-a, --author <author>", "Project author")
  .option("-l, --license <license>", "Project license")
  .option("-g, --git", "Initialize git repository")
  .option("-dep, --dependencies [dependencies...]", "Additional dependencies")
  .option("-D, --devDependencies [devDependencies...]", "Additional development dependencies")
  .option("--noInstall", "Skip dependencies installation")
  .description("Initialize a new TypeScript project (typescript, @types/node, tsup, vitest)")
  .action(async (option: TTSProject) => await NewTSLib(option));

IDE.addCommand(TS);

IDE.command("next")
  .option("-n, --name <name>", "Project name")
  .option("-a, --author <author>", "Project author")
  .option("-g, --git", "Initialize git repository")
  .description("Initialize a new Next.js project (TypeScript, NextJS, React, TailwindCSS, ChakraUI)")
  .action(async (option: TNextProject) => await NewNextProject(option));

IDE.command("c")
  .option("-n, --name <name>", "Project name")
  .description("Intialize a new C project.")
  .action(async (option: TNextProject) => await NewCProject(option));

IDE.command("license")
  .option("-l, license <license>", "Project license")
  .option("-a, --author <author>", "Project author")
  .action(async ({ license, author }) => await licenser(license, process.cwd(), author));

// IDE.command("py")
//   .alias("python")
//   .description("Initialize a new Python project")
//   .option("-n, --name <name>", "Project name")
//   .option("-g, --git", "Initialize git repository")
//   .option("-dep, --dependencies [dependencies...]", "Additional dependencies")
//   .action(async (option) => await python(option));

(async () => {
  IDE.parse(process.argv);
})();
