# 🚀 IDE v2

> 👽️ A CLI tool to quickly initialize new projects with custom templates! 📦️

[![NPM](https://img.shields.io/npm/v/@piarre/idev2.svg)](https://www.npmjs.com/package/@piarre/idev2)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ Features

- 🧩 Create projects from custom templates
- 🔍 Define project structure with simple YAML files
- 🔧 Execute commands as part of the setup process
- 🧰 Modify JSON files automatically
- 🔄 Support for variables within templates
- ⚙️ Multiple version formats (v1 and v2)

## 📥 Installation

```bash
bun install -g @piarre/idev2
```

## 🏁 Quick Start

### 1. Create a template directory

Templates are stored in `~/.ide/` folder. Create this folder if it doesn't exist yet:

```bash
mkdir -p ~/.ide
```

### 2. Create a template file

Create a YAML file in the `~/.ide/` directory with your template definition:

```yaml
# ~/.ide/ts.yml
name: ts
description: Create a TypeScript project

commands:
  - "npm init -y"
  - "npm i -D typescript @types/node tsup ts-node"

options:
  - name: "name"
    command: "-n, --name <n>"
    description: "Project name"
  - name: "git"
    command: "-g, --git"
    description: "Initialize git repository"
    execute:
      - "git init"

files:
  - path: src/index.ts
    content: |
      console.log("Hello, {{ name }}!");
  - path: tsconfig.json
    content: |
      {
        "compilerOptions": {
          "module": "CommonJS",
          "target": "ESNext",
          "outDir": "./out",
          "skipLibCheck": true
        },
        "include": ["src/**/*"],
        "exclude": ["node_modules"]
      }
```

### 3. Use your template

```bash
# Create a new project in a new directory
ide ts -n my-project

# Create a project in the current directory
cd my-empty-project
ide ts
```

## 🔄 Template Variables

You can use variables in your templates using the `{{ variable }}` syntax. These variables correspond to the options defined in your template.

```yaml
options:
  - name: "username"
    command: "-u, --username <username>"
    description: "Your username"

files:
  - path: README.md
    content: |
      # Project by {{ username }}
```

When running the command with `-u john`, the template will replace `{{ username }}` with `john`.

## 📚 Documentation

For more detailed documentation, visit [ide.piarre.app](https://ide.piarre.app/).

## 📜 License

This project is [MIT](LICENSE) licensed.

## 👨‍💻 Author

**Piarre** - [GitHub](https://github.com/Piarre)
