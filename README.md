# 🚀 IDE v3

> 👽️ A CLI to quickly initialize new projects from custom templates! 📦️

[![NPM](https://img.shields.io/npm/v/@piarre/idev2.svg)](https://www.npmjs.com/package/@piarre/idev2)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## ✨ Features

- 🧩 Generate projects from custom YAML templates
- 🔍 Define project structure easily with YAML
- 🔧 Run shell commands as part of initialization
- 🧰 Automatically modify JSON files
- 🔄 Dynamic variables in templates (`{{ variable }}`)
- ⚡️ Native Bun support for fast performance

## 📥 Installation

```bash
bun install -g @piarre/ide@3.0.0
```

## 🏁 Quick Start

### 1. Create the templates folder

Templates are stored in the `~/.ide/` directory.

```bash
mkdir -p ~/.ide
```

### 2. Create a YAML template

Example template:

```yaml
# ~/.ide/ts.yml
name: ts
description: Create a TypeScript project
options:
  - name: "git"
    command: "-g, --git"
    description: "Initialize a git repository"
    execute:
      - "git init"
actions:
  - files:
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
    commands:
      - "npm init -y"
      - "npm i -D typescript @types/node tsup ts-node"
```

### 3. Generate a project

```bash
# Create a new project in a dedicated folder
ide ts -n my-project

# Create in the current directory
cd empty-folder
ide ts
```

### 4. Display a template without running actions

```bash
ide ts --display-template
```

## 🔄 Template Variables

Use `{{ variable }}` in your YAML files or commands to inject values passed as options.

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

## 🛠️ Advanced Options

- `--directory <name>`: Create the project in a specific directory
- `--display-template`: Show the template content without running actions

## 📚 Documentation

More info at [ide.piarre.app](https://ide.piarre.app/).

## 📜 License

This project is [MIT](LICENSE) licensed.

## 👨‍💻 Author

**Piarre** - [GitHub](https://github.com/Piarre)
