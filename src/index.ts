import { mkdir, mkdirSync, readFileSync, readdir, readdirSync, write, writeFileSync } from "fs";
import { load } from "js-yaml";
import { dirname, join } from "path";
import { template } from "./@types/index.js";
import { Command } from "commander";
import editJSON, { exec } from "./lib/utils.js";

export const IDE = new Command();

IDE.version("1.0.0");

(async () => {
  await readdir(
    join(process.cwd(), "out", "templates"),
    {
      encoding: "utf8",
      recursive: true,
    },
    async (_, files) => {
      for (let template of files) {
        const { name, description, JSON, commands, files, options } = load(
          readFileSync(join(process.cwd(), "out", "templates", template), "utf8")
        ) as template;

        const cmd = IDE.command(name)
          .description(description)
          .action(async (option: any) => {
            if (!option.name) {
              console.error("Project name is required");
              process.exit(1);
            }

            const projectPath = join(process.cwd(), option.name);

            await mkdir(projectPath, (err) => {
              if (err) {
                console.error(err);
                process.exit(1);
              }
            });

            for (let command of commands ?? []) {
              const { stdout, stderr } = await exec(command, projectPath);

              console.log(stdout);
              console.log(stderr);
            }

            for (let file of files ?? []) {
              const filePath = join(projectPath, file.path);
              const fileContent = file.content ?? "";

              mkdirSync(dirname(filePath), { recursive: true });
              writeFileSync(
                filePath,
                fileContent.replace(/{{ .* }}/g, (match) => option[match.slice(3, -3)])
              );
            }

            for (let command of options ?? []) {
              const cmd = command.execute;
              if (cmd && option[command.name])
                Array.isArray(cmd) ? cmd.forEach((c) => exec(c, projectPath)) : exec(cmd, projectPath);
            }

            for (let json of JSON ?? []) {
              const filePath = join(projectPath, json.path);

              editJSON(filePath, json.key, json.value.replace(/{{ .* }}/g, (match) => option[match.slice(3, -3)]));
            }
          });

        for (let option of options ?? []) {
          cmd.option(option.command, option.description);
        }
      }
    }
  );

  IDE.parse(process.argv);
})();
