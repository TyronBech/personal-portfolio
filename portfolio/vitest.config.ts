import { defineConfig, mergeConfig } from 'vitest/config';
import type { UserConfig } from 'vite';
import viteConfig from './vite.config';

// Resolve the viteConfig if it is a configuration function (e.g. defineConfig(({ mode }) => ...))
const resolvedViteConfig = typeof viteConfig === 'function'
  ? (viteConfig as (env: { command: 'serve' | 'build'; mode: string }) => UserConfig)({ command: 'serve', mode: 'test' })
  : viteConfig;

export default mergeConfig(
  resolvedViteConfig as UserConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
  })
);

