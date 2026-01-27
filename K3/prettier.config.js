// @ts-check
/** @type {import("@trivago/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  useTabs: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-packagejson',
  ],
  tailwindFunctions: ['mergeStylesValues', 'cn', 'cva'],
  tailwindStylesheet: './app/globals.css',
  importOrder: [
    '^~/components/.*$',
    '^~/context/.*$',
    '^~/providers/.*$',
    '^~/hooks/.*$',
    '^~/generated/?.*$',
    '^~/.*$',
    '^\\.\\.?/.*$',
  ],
  importOrderSortSpecifiers: true,
  importOrderSeparation: true,
};
