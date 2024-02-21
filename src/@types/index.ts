type template = {
  name: string;
  description: string;
  files?: file[];
  commands?: string[];
  options?: option[];
  JSON?: JSON[];
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

export { template, option, file };
