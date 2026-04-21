import * as esbuild from 'esbuild';
import { parseArgs } from 'util';

const { values } = parseArgs({
  options: {
    watch: { type: 'boolean' },
    minify: { type: 'boolean' },
  },
});

const context = await esbuild.context({
  entryPoints: ['src/server/index.ts'],
  bundle: true,
  outfile: 'dist/server/index.js',
  minify: values.minify,
  sourcemap: true,
  format: 'cjs',
  platform: 'node',
  target: 'es2020',
});

if (values.watch) {
  await context.watch();
  console.log('Watching for changes...');
} else {
  await context.rebuild();
  await context.dispose();
  console.log('Build complete');
}
