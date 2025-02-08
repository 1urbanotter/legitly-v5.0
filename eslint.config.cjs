const path = require('path')
const { FlatCompat } = require('@eslint/eslintrc')
const prettierPlugin = require('eslint-plugin-prettier')
const tailwindcssPlugin = require('eslint-plugin-tailwindcss')
const simpleImportSortPlugin = require('eslint-plugin-simple-import-sort')

const __dirname = __filename ? path.dirname(__filename) : process.cwd() // Ensure dirname is set

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

module.exports = [
  ...compat.extends('next/core-web-vitals'),
  {
    ignores: ['node_modules', '.next', 'dist', 'public'],
    plugins: {
      prettier: prettierPlugin,
      tailwindcss: tailwindcssPlugin,
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'prettier/prettier': 'warn',
      'tailwindcss/classnames-order': 'warn',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      '@next/next/no-assign-module-variable': 'off',
    },
  },
]
