import { intro, outro, spinner, text } from "@clack/prompts";
import { execa } from "execa";
import * as fs from "fs";
import path from "path";
import { mkdir } from "../file.js";
import { TCProject } from "@/@types/Project.js";

export const NewCProject = async (project: TCProject) => {
  const s = spinner();
  const { name } = project;

  let finalName = name;
  let newName;

  intro("🎉 Initializing TypeScript Project");

  if (!name) {
    while (!newName) {
      newName = await text({
        message: "Project name",
        placeholder: "my-project",
      });
    }

    finalName = newName as string;
  }

  const projectPath = path.join(process.cwd(), finalName);

  const exec = async (command: string, args: any[] | string[]) =>
    await execa(command, args, { cwd: projectPath });
  if (!mkdir(projectPath)) {
    outro("🥅 Project already exists");
    return process.exit(0);
  }

  s.start(`Creating ${finalName}`);

  fs.mkdirSync(path.join(projectPath, "src"), { recursive: true });
  fs.mkdirSync(path.join(projectPath, "include"), { recursive: true });
  fs.writeFileSync(
    path.join(projectPath, "main.c"),
`\n\n\nint main(void)
{
    my_put_nbr(-2147483647);
    return 0;
}`
  );
  fs.writeFileSync(
    path.join(projectPath, "Makefile"),
    `
  SRC_DIR = src

SRC = $(wildcard $(SRC_DIR)/*.c)

OBJ = $(SRC:.c=.o)

CPPFLAGS = -Wall -Wextra

DEBUG = -Wall -Wextra -Werror

VALGRIND = -g3

INCLUDE = -I include

NAME = pool_exercise

all: $(NAME)

$(NAME): $(OBJ)
	gcc $(VALGRIND)  -o $(NAME) $(OBJ) $(INCLUDE) -c -o main.o main.c $(CPPFLAGS) 
	@echo "\\033[1;34mcompiled successfully 🎩\\033[0m"

debug:
	gcc -g3 -o $(NAME) $(OBJ) $(INCLUDE) $(DEBUG)
	@echo "\\033[1;34mcompiled  🎩\\033[0m"

clean:
	rm -f $(OBJ)
	@echo "\\033[1;33mcleaned objects 🧼\\033[0m"

fclean: clean
	rm -rf $(NAME)
	@echo "\\033[1;35mcleaned all 🚽\\033[0m"

re: fclean all
  `
  ),
    s.stop("Project created");

  outro(`🎉 Project ${finalName} created`);
};
