import { License } from "../types.js";
import { isCancel, text } from "@clack/prompts";
import path from "path";
import { writeFile } from "node:fs/promises";
import { writeFileSync } from "node:fs";


const licenser = async (license: License, _path: string, givenAuthor?: string) => {

  let fetchedLicense = await fetch(`https://api.github.com/licenses/${license}`)
    .then((res) => res.json())
    .then((res) => res.body);

  if (license == ("MIT" || "BSD-2-Clause" || "BSD-3-Clause" || "ISC")) {
    const name = givenAuthor ?? await text({
      message: "Author name",
      placeholder: "John Doe"
    });

    if (isCancel(name)) {
      console.log("Canceled");
      return process.exit(0);
    }

    fetchedLicense = fetchedLicense.replace(/\[fullname\]/g, name as string);
  }

  writeFileSync(`${_path}/LICENSE`, fetchedLicense.replace(/\[year\]/g, String(new Date().getFullYear())), {
    encoding: "utf-8"
  });
};

export default licenser;