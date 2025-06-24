---
title: IDE CLI v3 - Documentation
---

# IDE CLI v3

The `ide` CLI (v3) lets you generate projects from custom YAML templates, with file management, shell commands, and JSON editing.

## Installation

Add the package to your project:

```bash
bun add -D @piarre/ide
```

## Basic usage

```bash
ide <template> [options]
```

- Templates are `.yml` or `.yaml` files placed in `~/.ide/`.
- Each template defines a name, description, options, and actions (file creation, shell commands, JSON editing).

## Main commands

- `ide <template>`: Generate a project from the selected template.
- `-t, --display-template`: Show the template content without running actions.
- `-d, --directory <name>`: Create the project in a specific directory.

## Example usage

```bash
ide my-template -d my-project
```

## YAML template structure

```yaml
name: my-template
description: A custom project template
options:
  - command: --with-feature
    description: Add feature X
    name: withFeature
    execute: echo "Feature X added"
actions:
  - files:
      - path: README.md
        content: |
          # My project
          Welcome!
    commands:
      - echo "Project initialized"
    JSON:
      - path: package.json
        key: name
        value: my-project
```

## Advanced features

- Variables in files: use <code v-pre>{{ variable }}</code> to inject option values.
- Run shell commands and edit JSON files.

## See also

- [API Examples](/api-examples)
- [Markdown Examples](/markdown-examples)

---

For more information, see the project README or the template documentation.
