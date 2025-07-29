'use strict';

module.exports = {
  arrowParens: 'always',
  trailingComma: 'none',
  singleQuote: false,
  plugins: ['prettier-plugin-svelte'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }]
};
