type template = {
  name: string;
  description?: string;
  options?: option[] & {
    displayTemplate?: boolean;
    directory?: string;
    name: string;
    description?: string;
  };
  actions: {
    files?: file[];
    commands?: string | string[];
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

export { type template, type option, type file, type JSON };
