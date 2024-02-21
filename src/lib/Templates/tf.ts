import { TCProject } from "@/@types/Project.js";
import { intro, outro, spinner, text } from "@clack/prompts";
import { mkdir } from "../file.js";
import * as fs from "fs";
import { join } from "path";

export const newTerraformProject = async (project: TCProject) => {
  const s = spinner();
  const { name } = project;

  let finalName = name;
  let newName;

  intro("🎉 Initializing Terraform Project");

  if (!name) {
    while (!newName) {
      newName = await text({
        message: "Project name",
        placeholder: "my-project",
      });
    }

    finalName = newName as string;
  }

  const projectPath = join(process.cwd(), finalName);

  if (!mkdir(projectPath)) {
    outro("🥅 Project already exists");
    return process.exit(0);
  }

  s.start(`Creating ${finalName}`);
  fs.writeFileSync(join(projectPath, "providers.tf"), "");
  fs.writeFileSync(join(projectPath, "credentials.auto.tfvars"), "");

  s.stop("🎉 Done");

  outro("🎉 Project created");
};
