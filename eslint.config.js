import { defineConfig } from '@soybeanjs/eslint-config';

export default defineConfig(
  { vue: true, ignores: ['public/*'], unocss: true },
  {
    rules: {
      'vue/multi-word-component-names': [
        'warn',
        {
          ignores: ['index', 'App', 'Register', '[id]', '[url]']
        }
      ],
      'vue/component-name-in-template-casing': [
        'warn',
        'PascalCase',
        {
          registeredComponentsOnly: false,
          ignores: ['/^icon-/']
        }
      ],
      'vue/no-reserved-component-names': 'off',
      'unocss/order-attributify': 'off'
    }
  }
);
