import { TypeScriptProject } from "../../types.js";
import { execa } from "execa";
import { init } from "../git.js";
import { cancel, intro, isCancel, outro, spinner, text } from "@clack/prompts";

export const next = async (option: TypeScriptProject) => {
  const s = spinner();
  const { name, git } = option;
  let finalName = name;
  let newName;

  intro("🎉 Initializing Next.js Project");

  if (!name) {
    while (!newName) {
      newName = await text({
        message: "Project name",
        placeholder: "my-project"
      });
    }

    finalName = newName as string;
  }

  s.start(`Creating ${finalName} from github.com/Piarre/tailwind-chakra-ui-template`);

  await execa("npm", ["i", "-g", "create-next-app@latest"]);
  await execa("npx", ["create-next-app@latest", finalName, "--example", "https://github.com/Piarre/tailwind-chakra-ui-template"]);

  git && await init(finalName);

  outro("🎉 Next.js Project Initialized");
};