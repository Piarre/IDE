import { License } from "./License.js";

export type TProject = {
  name: string;
  description: string;
  git: boolean;
  ignore: string;
  license: License;
};

export type TTSProject = TProject & {
  author: string;
  dependencies: string[];
  devDependencies: string[];
  noInstall: boolean;
  ignore: string;
};

export type TNextProject = TProject & {
  author: string;
};

export type TPythonProject = TProject & {
  author: string;
};

export type TCProject = Pick<TProject, "name">;

export type ProjectType = TTSProject | TNextProject | TPythonProject;
