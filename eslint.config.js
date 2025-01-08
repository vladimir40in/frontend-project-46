import eslintPluginJest from 'eslint-plugin-jest';
import eslintConfigAirbnb from 'eslint-config-airbnb-base';

export default [
  {
    plugins: {
      jest: eslintPluginJest,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...eslintConfigAirbnb.globals,
      },
    },
    env: {
      node: true,
    },
    extends: [
      'eslint:recommended',
      'airbnb-base',
      'plugin:jest/recommended',
    ],
    rules: {
      'no-console': 'off',
      'import/extensions': ['error', 'ignorePackages', { 'js': 'always' }],
      'no-underscore-dangle': ['error', { 'allow': ['__filename', '__dirname'] }],
    },
  },
];
