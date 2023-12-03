type Project = {
  name: string;
  description: string;
  license: "Apache-2.0" | "GPL-3.0" | "MIT" | "BSD-2-Clause" | "BSD-3-Clause" | "BSL-1.0" | "CC0-1.0" | "EPL-2.0" | "AGPL-3.0" | "GPL-2.0" | "LGPL-2.1" | "MPL-2.0" | "Unlicense";
};

export interface TypeScriptProject extends Project {
  author: string;
  git: boolean;
  dependencies: string[];
  devDependencies: string[];
}
