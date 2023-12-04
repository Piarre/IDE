import { intro, outro, spinner } from "@clack/prompts";
import { rmSync } from "fs";
import { execa } from "execa";

(async () => {
  intro("👷 IDE Builder");
  const s = spinner();
  s.start("Building");
  await rmSync("out/", {
    force: true,
    recursive: true,
  });
  await execa("npx", ["tsup"]);
  s.stop("Built");
  outro("✨ Done!");
})();
