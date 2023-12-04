import { Command } from "commander";
import { init } from "./Utils/Template/Typescript.js";
import { TypeScriptProject } from "./types.js";
import { next } from "./Utils/Template/Next.js";

export const IDE = new Command();

IDE.version("0.0.1");

IDE.command("ts")
  .option("-n, --name <name>", "Project name")
  .option("-d, --description <description>", "Project description")
  .option("-a, --author <author>", "Project author")
  .option("-l, --license <license>", "Project license")
  .option("-g, --git", "Initialize git repository")
  .option("-dep, --dependencies [dependencies...]", "Additional dependencies")
  .option("-D, --devDependencies [devDependencies...]", "Additional dev dependencies")
  .description("Initialize a new TypeScript project (typescript, @types/node, tsup)")
  .action(async (option: TypeScriptProject) => await init(option));

IDE.command("next")
  .option("-n, --name <name>", "Project name")
  .option("-g, --git", "Initialize git repository")
  .description("Initialize a new Next.js project (typescript, next, react, react-dom)")
  .action(async (option: TypeScriptProject) => await next(option));

(async () => {
  IDE.parse(process.argv);
})();
