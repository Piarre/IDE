type template = {
  name: string;
  description?: string;
  version: number;
  options?: option[];
};

type V1Template = template & {
  files?: file[];
  commands?: string[];
  JSON?: JSON[];
};

type V2Template = template & {
  actions: {
    files?: file[];
    commands?: string[];
    JSON?: JSON[];
  }[];
};

type JSON = {
  path: string;
  key: string;
  value: string;
};

type option = {
  name: string;
  description: string;
  command: string;
  execute?: string[];
};

type file = {
  path: string;
  content?: string;
};

export { template, V1Template, V2Template, option, file, JSON };
