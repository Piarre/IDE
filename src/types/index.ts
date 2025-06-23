// type template = {
//   name: string;
//   description?: string;
//   version: number;
//   options?: option[];
// };

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

type DisplayTemplateAction = {
  displayTemplate: boolean;
};

type template = {
  name: string;
  description?: string;
  version: number;
  options?: option[];
} & (
  | ({
      // V1
      files?: file[];
      commands?: string[];
      JSON?: JSON[];
    } & DisplayTemplateAction)
  | {
      // V2
      actions: ({
        files?: file[];
        commands?: string | string[];
        JSON?: JSON[];
      } & DisplayTemplateAction)[];
    }
);

export { type template, type option, type file, type JSON };
