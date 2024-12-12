/// <reference types="vitest" />
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as process from 'node:process'
import { loadEnv } from 'vite'
import type { ConfigEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import GenerateConfig from 'unplugin-config/vite'
import Components from 'unplugin-vue-components/vite'
import Unocss from 'unocss/vite'
import AntdvResolver from 'antdv-component-resolver'

const baseSrc = fileURLToPath(new URL('./src', import.meta.url))
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'vue-i18n',
          '@vueuse/core',
          'pinia',
        ],
        dts: 'types/auto-imports.d.ts',
        dirs: ['src/stores', 'src/composables'],
      }),
      Components({
        resolvers: [AntdvResolver()],
        dts: 'types/components.d.ts',
        dirs: ['src/components'],
      }),
      // https://github.com/kirklin/unplugin-config
      GenerateConfig({
        appName: env.VITE_GLOB_APP_TITLE,
        configFile: {
          generate: true,
        },
      }),
      Unocss(),
    ],
    resolve: {
      alias: [
        {
          find: 'dayjs',
          replacement: 'dayjs/esm',
        },
        {
          find: /^dayjs\/locale/,
          replacement: 'dayjs/esm/locale',
        },
        {
          find: /^dayjs\/plugin/,
          replacement: 'dayjs/esm/plugin',
        },
        {
          find: 'vue-i18n',
          replacement: mode === 'development' ? 'vue-i18n/dist/vue-i18n.esm-browser.js' : 'vue-i18n/dist/vue-i18n.esm-bundler.js',
        },
        {
          find: /^ant-design-vue\/es$/,
          replacement: 'ant-design-vue/es',
        },
        {
          find: /^ant-design-vue\/dist$/,
          replacement: 'ant-design-vue/dist',
        },
        {
          find: /^ant-design-vue\/lib$/,
          replacement: 'ant-design-vue/es',
        },
        {
          find: /^ant-design-vue$/,
          replacement: 'ant-design-vue/es',
        },
        {
          find: 'lodash',
          replacement: 'lodash-es',
        },
        {
          find: '~@',
          replacement: baseSrc,
        },
        {
          find: '~',
          replacement: baseSrc,
        },
        {
          find: '@',
          replacement: baseSrc,
        },
        {
          find: '~#',
          replacement: resolve(baseSrc, './enums'),
        },
      ],
    },
    build: {
      chunkSizeWarningLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia', 'vue-i18n', '@vueuse/core'],
            antd: ['ant-design-vue', '@ant-design/icons-vue', 'dayjs'],
            // lodash: ['loadsh-es'],
          },
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000/api', // 目标后端API域名
          changeOrigin: true, // 是否改变源地址
          rewrite: path => path.replace(/^\/api/, ''), // 重写路径
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
    },
  }
}
