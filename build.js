import { intro, outro, spinner } from "@clack/prompts";
import { copyFileSync, mkdirSync, readdirSync, rmSync } from "fs";
import { execa } from "execa";
import { join } from "path";

const outPath = join(process.cwd(), "out", "templates");
const devPath = join(process.cwd(), "src", "templates");

(async () => {
  intro("👷 IDE - v2 Builder");
  const s = spinner();
  s.start("Building");
  await rmSync("out/", {
    force: true,
    recursive: true,
  });
  await execa("npx", ["tsup"]);
  mkdirSync(outPath);
  // readdirSync(devPath).forEach((file) => copyFileSync(join(devPath, file), join(outPath, file)));
  s.stop("Built");
  outro("✨ Done!");
})();
