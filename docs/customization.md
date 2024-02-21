---
title: Customization
---

# IDE - v2
Customize your own templates

## File structure

Using a YML file, you can get any template you want !

Here an example with a TypeScript project :

```yaml{1,2,5,6,10,11,25,26}
# The name will be the command name
name: ts
description: Create a TypeScript project

# Here you can give a bunch of commands to execute
commands:
  - "npm init -y"
  - "npm i -D typescript @types/node tsup ts-node vitest"

# You can also give some options to the user and use theme as variables
options:
  - name: "name"
    command: "-n, --name <name>"
    description: "Project name"
  - name: "description"
    command: "-d, --description <description>"
    description: "Project description"
  - name: "author"
    command: "-a, --author <author>"
    description: "Project author"
  - name: "git"
    command: "-g, --git"
    description: "Initialize a git repository"

# Here it's the files you want to create with there content
files:
  - path: src/index.ts
    content: |
      console.log("Hello, World!");
  - path: tsup.config.ts
    content: |
      import { defineConfig } from "tsup";

      export default defineConfig({
          entryPoints: ["src/**/*.ts"],
          target: "esnext",
          format: ["cjs", "esm"],
          outDir: "out",
          dts: true,
          clean: true,
      });
  - path: tsconfig.json
    content: |
      {
        "compilerOptions": {
          "module": "CommonJS",
          "target": "ESNext",
          "declaration": true,
          "allowSyntheticDefaultImports": true,
          "outDir": "./out",
          "skipLibCheck": true,
          "inlineSourceMap": true,
          "typeRoots": ["./node_modules/@types", "./src/@types/*.d.ts"],
          "declarationDir": "./@types"
        },
        "include": ["src/**/*"],
        "exclude": ["node_modules", "tests"]
      }
```

## Properties

- `name` (string): The name of the command
- `description` (string): The description of the command
- `commands` (string[]): The commands to execute
- `options` (option[]): The options to add to the command
- `files` (file[]): The files to create (you can give a path)

## Types

### Template

When the CLI read the yml file, it will create a `Template` object.

```ts
type template = {
  name: string;
  description: string;
  files?: file[];
  commands?: string[];
  options?: option[];
};
```

### option

```ts
type option = {
  name: string;
  description: string;
  command: string;
  execute?: string[];
};
```

### file

```ts
type file = {
  path: string;
  content?: string;
};
```
