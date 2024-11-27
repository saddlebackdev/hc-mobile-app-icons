import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'generated/v2/web/index.ts',
    output: {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
      preserveModules: true,
    },
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ 
        tsconfig: './tsconfig.json',
        outDir: 'dist', // Ensure this matches the output dir
        declarationDir: 'dist/types',
        declaration: true,
        sourceMap: true,
      }),
      copy({
        targets: [
          { src: 'generated/v2/index.js', dest: 'dist/generated/v2' },
          { src: 'generated/v2/icons/**/*', dest: 'dist/generated/v2/icons' }
        ]
      }),
    ],
    onwarn(warning, warn) {
      if (warning.code === 'THIS_IS_UNDEFINED') return;
      warn(warning);
    }
  }
];