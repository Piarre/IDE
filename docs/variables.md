---
title: Variable
---

# Variable

If you want to use a value that was passed in a option you can use it.

```yaml
options:
  - name: name
    description: Your name
    type: string
  - name: age
    description: Your age
    type: number
```

If you do `ide cmd --name John --age 25`

You can use variables in your files

```yaml
files:
  - path: "src/index.js"
    content: |
      const name = "{{ name }}";
      const age = {{ age }};
```
