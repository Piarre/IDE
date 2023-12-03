import { isCancel, outro } from "@clack/prompts";
import chalk from "chalk";

export function Cancel(event: unknown, message?: string) {
  if (isCancel(event)) {
    outro(`🔥 ${chalk.red(message || "Exited")}`);
    process.exit(0);
  }
}
