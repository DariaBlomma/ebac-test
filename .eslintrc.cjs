/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/airbnb',
    '@vue/eslint-config-typescript',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json', '.tsx', '.ts', '.scss'],
      },
      typescript: {},
    },
    'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
    'import/external-module-folders': ['node_modules', 'node_modules/@types'],
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    //* it prevents from using barrel import - https://basarat.gitbook.io/typescript/main-1/barrel
    'import/prefer-default-export': 'off',
    // https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md
    'import/no-extraneous-dependencies': ['error', { devDependencies: true, optionalDependencies: false, peerDependencies: false }],
    // https://eslint.vuejs.org/rules/no-template-target-blank.html
    'vue/no-template-target-blank': ['error', {
      allowReferrer: true,
    }],
    'vue/multiline-html-element-content-newline': ['error', {
      ignores: ['pre', 'textarea'],
      allowEmptyLines: true,
    }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        '': 'never',
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
