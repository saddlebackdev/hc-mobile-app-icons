import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_DIR = path.resolve(__dirname, "../generated/v2/web/components");

const exportsArray = [];

const files = fs.readdirSync(BASE_DIR);
files.forEach(fileName => {
  const name = fileName.split(".tsx")[0];
  exportsArray.push({
    name,
    path: `./components/${name}`,
  });
});

fs.writeFileSync(
  path.resolve(__dirname, "../generated/v2/web/index.ts"),
  `/* !!!! This file is generated automatically, please don't modify it!!!! */\n${exportsArray
    .map(item => {
      return `export { default as ${item.name} } from "${item.path}";`;
    })
    .join("\n")}`
);
