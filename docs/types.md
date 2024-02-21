---
title: Types
---

# Types

## Template

When the CLI read the yml file, it will create a `Template` object.

```ts
type template = {
  name: string;
  description: string;
  files?: file[];
  commands?: string[];
  options?: option[];
  JSON?: JSON[];
};
```

## Option

You can also give some options to the user and use theme as variables

| name                  | command                            | description                | execute `?`                                                                  |
| --------------------- | ---------------------------------- | -------------------------- | ---------------------------------------------------------------------------- |
| The path of your file | The can put code on multiple lines | Description of your option | if your optional is a boolean, you can execute command if the option is true |

Example:

```yaml
options:
  - name: "git"
    command: "-g, --git"
    description: "Initialize a git repository"
    execute:
      - "git init"
```

Type is:

```ts
type option = {
  name: string;
  description: string;
  command: string;
  execute?: string[];
};
```

## File

Here it's the files you want to create with there content

| Path                  | Content                                                      |
| --------------------- | ------------------------------------------------------------ |
| The path of your file | The content of your file, you can put code on multiple lines |

Example:

```yaml
files:
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

Type is:

```ts
type file = {
  path: string;
  content?: string;
};
```

## JSON

You can also modify JSON files using

| Path                  | Key             | Value            |
| --------------------- | --------------- | ---------------- |
| The path of your file | The key to edit | The value to put |

Example:

```yaml
JSON:
  - path: package.json
    key: "name"
    value: "{{ name }}"
```

Type is

```ts
type JSON = {
  path: string;
  key: string;
  value: string;
};
```
