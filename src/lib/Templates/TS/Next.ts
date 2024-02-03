import { execa } from "execa";
import { init } from "../../git.js";
import { intro, outro, spinner, text } from "@clack/prompts";
import path from "path";
import modifyJSON from "../../JSON.js";
import NextIgnore from "@/lib/Ignores/Next.js";
import { TNextProject } from "@/@types/Project.js";

export const NewNextProject = async (option: TNextProject) => {
  const s = spinner();
  const { name, git, author } = option;

  let finalName = name;
  let newName;

  const pkg = (key: string, newValue: string | Object) =>
    modifyJSON("package.json", key, newValue, { cwd: finalName });

  intro("🎉 Initializing Next.js Project");

  if (!name) {
    while (!newName) {
      newName = await text({
        message: "Project name",
        placeholder: "my-project",
      });
    }

    finalName = newName as string;
  }

  s.start(`Creating ${finalName} from github.com/Piarre/tailwind-chakra-ui-template`);

  await execa("npm", ["i", "-g", "create-next-app@latest"]);
  await execa("npx", [
    "create-next-app@latest",
    finalName,
    "--example",
    "https://github.com/Piarre/tailwind-chakra-ui-template",
  ]);

  pkg("name", finalName);
  author && pkg("author", author);

  s.stop("Next.js Project Created");

  git && (await init(path.join(process.cwd(), finalName), NextIgnore));

  outro("🎉 Next.js Project Initialized");
};
