type template = {
  name: string;
  description: string;
  files?: file[];
  commands?: string[];
  options?: option[];
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
