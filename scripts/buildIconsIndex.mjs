import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseFileName } from './utils.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_DIR = path.resolve(__dirname, "../generated/v2/icons");

const exportsArray = [];

const files = fs.readdirSync(BASE_DIR);
files.forEach(fileName => {
  const name = 'Icon' + parseFileName(path.basename(fileName, '.svg'));
  exportsArray.push({
    name,
    path: `./icons/${fileName}`,
  });
});

fs.writeFileSync(
  path.resolve(__dirname, "../generated/v2/index.js"),
  `/* !!!! This file is generated automatically, please don't modify it!!!! */\n${exportsArray
    .map(item => {
      return `export { default as ${item.name} } from "${item.path}";`;
    })
    .join("\n")}`
);

// Generate index.d.ts for svg
fs.writeFileSync(
  path.resolve(__dirname, "../generated/v2/index.d.ts"),
  `/* !!!! This file is generated automatically, please don't modify it!!!! */\n${exportsArray
    .map((item) => {
      return `export declare const ${item.name}: string;`;
    })
    .join("\n")}`
);
