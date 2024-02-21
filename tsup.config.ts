import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  name: "IDE - v2",
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  platform: "node",
  outDir: "out/",
});
