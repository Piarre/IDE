import { Command, program } from "commander";
import { init } from "./Utils/Logic/TS/Typescript.js";
import { TypeScriptProject } from "./types.js";
import { next } from "./Utils/Logic/TS/Next.js";
import { python } from "./Utils/Logic/Python.js";
import { TSLib } from "./Utils/Logic/TS/Library.js";

export const IDE = new Command();

IDE.version("1.0.0");

const TS = new Command("ts")
  .description("TypeScript, NextJS or TS Library");

TS.command("ts")
  .option("-n, --name <name>", "Project name")
  .option("-d, --description <description>", "Project description")
  .option("-a, --author <author>", "Project author")
  .option("-l, --license <license>", "Project license")
  .option("-g, --git", "Initialize git repository")
  .option("-dep, --dependencies [dependencies...]", "Additional dependencies")
  .option("-D, --devDependencies [devDependencies...]", "Additional dev dependencies")
  .description("Initialize a new TypeScript project (typescript, @types/node, tsup)")
  .action(async (option: TypeScriptProject) => await init(option));

TS.command("lib")
  .option("-n, --name <name>", "Project name")
  .option("-d, --description <description>", "Project description")
  .option("-a, --author <author>", "Project author")
  .option("-l, --license <license>", "Project license")
  .option("-g, --git", "Initialize git repository")
  .option("-dep, --dependencies [dependencies...]", "Additional dependencies")
  .option("-D, --devDependencies [devDependencies...]", "Additional dev dependencies")
  .description("Initialize a new TypeScript project (typescript, @types/node, tsup, vitest)")
  .action(async (option: TypeScriptProject) => await TSLib(option));

TS.command("next")
  .option("-n, --name <name>", "Project name")
  .option("-g, --git", "Initialize git repository")
  .description("Initialize a new Next.js project (TypeScript, NextJS, React, TailwindCSS, ChakraUI)")
  .action(async (option: TypeScriptProject) => await next(option));

IDE.addCommand(TS);

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
