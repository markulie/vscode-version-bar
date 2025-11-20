import { build } from 'esbuild'

build({
  entryPoints: ['src/extension.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'out/extension.js',
  sourcemap: true,
  external: ['vscode']
}).catch(() => process.exit(1))
