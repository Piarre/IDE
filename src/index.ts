import { mkdir, readFileSync, readdir } from "fs";
import { load } from "js-yaml";
import { join } from "path";
import { template, V1Template, V2Template } from "./@types/index.js";
import { Command } from "commander";
import { checkHomedir, exec } from "./lib/utils.js";
import { homedir } from "os";
import { editJSONs, runCommand, writeFile } from "./lib/actions.js";

export const IDE = new Command();

IDE.version("1.0.4");

(async () => {
  const templateFolder = join(homedir(), ".ide");

  checkHomedir();

  readdir(
    templateFolder,
    {
      encoding: "utf8",
      recursive: true,
    },
    async (_, files) => {
      for (let template of files) {
        const yml = load(readFileSync(join(templateFolder, template), "utf8")) as any;

        const { name, description, version, options, ...rest } = yml as template;
        if (!description) return console.error("Description is required");

        if (version == 1) {
          const { files, commands, JSON } = rest as V1Template;

          const cmd = IDE.command(name)
            .description(description)
            .action(async (option: any) => {
              let projectPath = join(process.cwd(), option.name ?? "");

              if (!option.name) projectPath = process.cwd();

              option.name &&
                (await mkdir(projectPath, (err) => {
                  if (err) {
                    console.error(err);
                    process.exit(1);
                  }
                }));

              await runCommand(commands, projectPath);

              await writeFile(files, projectPath, option);

              for (let command of options ?? []) {
                const cmd = command.execute;
                if (cmd && option[command.name])
                  Array.isArray(cmd)
                    ? cmd.forEach((c) => exec(c, projectPath))
                    : exec(cmd, projectPath);
              }

              editJSONs(JSON, projectPath, option);
            });

          for (let option of options ?? []) {
            cmd.option(option.command, option.description);
          }
        }

        if (version == 2) {
          const { actions, options } = rest as V2Template;

          actions.forEach(async (action) => {
            const { files, commands, JSON } = action;

            const cmd = IDE.command(name)
              .description(description)
              .action(async (option: any) => {
                let projectPath = join(process.cwd(), option.name ?? "");

                if (!option.name) projectPath = process.cwd();

                if (option.name != undefined) {
                  await mkdir(projectPath, (err) => {
                    if (err) {
                      console.error(err);
                      process.exit(1);
                    }
                  });
                }

                if (action.files) await writeFile(files, projectPath, option);

                if (action.commands) await runCommand(commands, projectPath);

                if (action.JSON) editJSONs(JSON, projectPath, option);

                for (let command of options ?? []) {
                  const cmd = command.execute;
                  if (cmd && option[command.name])
                    Array.isArray(cmd)
                      ? cmd.forEach((c) => exec(c, projectPath))
                      : exec(cmd, projectPath);
                }
              });

            for (let option of options ?? []) {
              cmd.option(option.command, option.description);
            }
          });
        }
      }
    },
  );

  IDE.parse(process.argv);
})();
