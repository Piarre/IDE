#!/usr/bin/env bun
import { Command } from "commander";
import { homedir } from "os";
import { join } from "node:path";
import { load } from "js-yaml";
import { checkHomedir, displayFile, editJSON, exec, writeFiles } from "@/lib/utils";
import type { template } from "@/types";
import { mkdir } from "node:fs/promises";

export const CLI = new Command();

CLI.name("ide").version("3.0.0");

(async () => {
  const templateFolder = join(homedir(), ".ide");

  checkHomedir();

  const files = new Bun.Glob(`${templateFolder}/*.{yml,yaml}`).scanSync(".");

  for await (const template of files) {
    const fileContent = await Bun.file(template.replace(/\\/g, "/")).text();

    let { version, name, description, options, ...rest } = load(fileContent) as template;

    if (!version) version = 2;

    switch (version) {
      case 1:
        break;
      case 2:
        if ("actions" in rest) {
          const { actions } = rest;

          const cmd = CLI.command(name)
            .description(description ?? "")
            .option("-d, --display-template", "Show the template without running actions")
            .action(async (option) => {
              if (option.displayTemplate) return displayFile(fileContent);

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
 
                commands &&
                  (Array.isArray(commands)
                    ? commands.forEach((cmd) => exec(cmd, projectPath))
                    : exec(commands, projectPath));

                if (JSON) {
                  for (const jsonEdit of Array.isArray(JSON) ? JSON : [JSON]) {
                    const { key, path, value } = jsonEdit;
                    await editJSON(path, key, value, { cwd: projectPath });
                  }
                }
              }

              return;
            });

          for (let opt of options ?? []) cmd.option(opt.command, opt.description);
        }
        break;
      default:
        console.error(`Template version ${version} is not supported.`);
        break;
    }
  }

  CLI.parse(process.argv);
})();
