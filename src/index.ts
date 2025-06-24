#!/usr/bin/env bun
import { Command } from "commander";
import { homedir } from "os";
import { join } from "node:path";
import { load } from "js-yaml";
import { checkHomedir, displayFile, editJSON, exec, writeFiles } from "@/lib/utils";
import type { template } from "@/types";
import { mkdir } from "node:fs/promises";
import { editJSONs, executeCommands } from "./lib/actions";

export const CLI = new Command();

// prettier-ignore
CLI
.name("ide")
.version("3.0.0")
.addHelpText("afterAll", "\n\x1b[31mOnly support v2 templates\x1b[0m");

(async () => {
  const templateFolder = join(homedir(), ".ide");

  checkHomedir();

  const files = new Bun.Glob(`${templateFolder}/*.{yml,yaml}`).scanSync(".");

  for await (const template of files) {
    const fileContent = await Bun.file(template.replace(/\\/g, "/")).text();

    let { name, description, options, actions } = load(fileContent) as template;

    const cmd = CLI.command(name)
      .description(description ?? "")
      .option("-t, --display-template", "Show the template without running actions")
      .option("-d, --directory <name>", "Create the project in a specific directory", name ?? ".")
      .action(async (option: template["options"] & { [key: string]: any }) => {
        if (option?.displayTemplate) return displayFile(fileContent);

        if (option?.directory) {
          mkdir(join(process.cwd(), option.directory), { recursive: true });
          process.chdir(option.directory);
        }

        let projectPath = join(process.cwd(), name);

        if (!name) projectPath = process.cwd();

        name &&
          (await mkdir(projectPath).catch((err) => {
            if (err) {
              console.error(`Error creating directory: ${err.message}`);
              process.exit(1);
            }
          }));

        for (const action of actions) {
          const { files, commands, JSON } = action;

          files && (await writeFiles(files, projectPath, option));

          commands && executeCommands(commands, projectPath);

          JSON && editJSONs(JSON, projectPath, option);

          for (let command of options ?? []) {
            const cmd = command.execute;
            if (cmd && option && option[command.name]) executeCommands(cmd, projectPath);
          }
        }

        return;
      });

    for (let opt of options ?? []) cmd.option(opt.command, opt.description);
  }

  CLI.parse(process.argv);
})();
