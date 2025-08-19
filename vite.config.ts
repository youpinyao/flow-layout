import { defineConfig } from 'vite';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ command }) => {
  if (command === 'build') {
    // Library build configuration
    return {
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'FlowLayout',
          fileName: format =>
            `flow-layout.${format === 'es' ? 'es' : 'umd'}.js`,
          formats: ['es', 'umd'],
        },
        rollupOptions: {
          external: [],
          output: {
            globals: {},
            exports: 'named',
          },
        },
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src'),
        },
      },
    };
  } else {
    // Development configuration with demo page
    return {
      root: resolve(__dirname, 'demo'),
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src'),
        },
      },
    };
  }
});
