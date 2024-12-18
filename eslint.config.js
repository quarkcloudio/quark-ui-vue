import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'types/auto-imports.d.ts',
    'types/components.d.ts',
    'public',
    'tsconfig.*.json',
    'tsconfig.json',
  ],
}, {
  rules: {
    'no-console': 0,
    'style/quote-props': 0,
    'unused-imports/no-unused-vars': 0,
    'ts/no-unused-expressions': 0,
    'node/prefer-global/buffer': 0,
    'node/prefer-global/process': 0,
    'ts/no-unsafe-function-type': 0,
    'ts/no-empty-object-type': 0,
  },
})
