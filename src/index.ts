import { Command } from "commander";
import { homedir } from "os";
import { join } from "node:path";
import { load } from "js-yaml";
import { checkHomedir } from "@/lib/utils";
import type { template } from "@/types";

export const CLI = new Command();

CLI.name("ide").version("3.0.0");

(async () => {
  const templateFolder = join(homedir(), ".ide");

  checkHomedir();

  const files = await new Bun.Glob(`${templateFolder}/*.{yml,yaml}`).scan(".");

  (await Array.fromAsync(files)).forEach(async (template) => {
    let { version, name, description, options, ...rest } = load(await Bun.file(template).text()) as template;

    if (!version) version = 2;

    switch (version) {
      case 1:
        break;
      case 2:
        if ("actions" in rest) {
          const { actions } = rest;

          actions.forEach((action) => {
            const { files, commands, JSON } = action;

            
          });
        }

        break;
    }
  });
})();
