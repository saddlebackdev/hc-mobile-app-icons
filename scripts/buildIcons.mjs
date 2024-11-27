import fs from 'fs';
import path from 'path';
import { optimize } from 'svgo';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_DIR = path.join(__dirname, '../src/v2/icons');
const OUTPUT_DIR = path.join(__dirname, '../generated/v2/icons');

const replaceAttributesPlugin = {
  name: 'replaceAttributes',
  type: 'visitor',
  active: true,
  fn: () => {
    return {
      element: {
        enter: (node) => {
          // Replace fill attribute
          if (node.attributes.fill) {
            node.attributes.fill = 'currentColor';
          }
        }
      }
    };
  }
};

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function convertSvgToComponent(file) {
  const content = fs.readFileSync(path.join(ICONS_DIR, file), 'utf-8');

  const optimizedSvg = optimize(content, {
    plugins: [
      { name: 'preset-default', params: { overrides: { removeViewBox: false } } },
      'removeXMLNS',
      'convertStyleToAttrs',
      replaceAttributesPlugin,
    ],
  });

  fs.writeFileSync(
    path.join(OUTPUT_DIR, file),
    optimizedSvg.data
  );
}

fs.readdirSync(ICONS_DIR)
  .filter(file => file.endsWith('.svg'))
  .forEach(convertSvgToComponent);
