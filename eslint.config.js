// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      // Désactiver la règle qui empêche d'utiliser l'apostrophe (') directement dans le JSX
      'react/no-unescaped-entities': 'off',
    },
  },
]);
