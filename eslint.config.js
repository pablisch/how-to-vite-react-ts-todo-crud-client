// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'
// import prettier from 'eslint-plugin-prettier'
// import react from 'eslint-plugin-react'
// import prettierConfig from 'eslint-config-prettier'
//
// export default tseslint.config(
//   {
//     ignores: ['dist'],
//   },
//   {
//     files: ['**/*.{ts,tsx}'],
//     extends: [
//       js.configs.recommended,
//       ...tseslint.configs.recommended,
//       prettierConfig, // This disables ESLint rules that conflict with Prettier
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: {
//         ...globals.browser,
//       },
//       parser: tseslint.parser,
//       parserOptions: {
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//       prettier: prettier,
//       react: react,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       'padded-blocks': ['error', { blocks: 'always' }],
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//       'prettier/prettier': [
//         'error',
//         {
//           semi: false,
//           singleQuote: true,
//           tabWidth: 2,
//           jsxBracketSameLine: false,
//         },
//         {
//           usePrettierrc: true, // Uses .prettierrc file
//         },
//       ],
//     },
//     settings: {
//       react: {
//         version: 'detect',
//       },
//     },
//   }
// )

// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'
// import prettier from 'eslint-plugin-prettier'
// import react from 'eslint-plugin-react'
// import prettierConfig from 'eslint-config-prettier'
// import stylistic from '@stylistic/eslint-plugin'
//
// export default tseslint.config(
//   {
//     ignores: ['dist'],
//   },
//   {
//     files: ['**/*.{ts,tsx}'],
//     extends: [
//       js.configs.recommended,
//       ...tseslint.configs.recommended,
//       prettierConfig, // Disable conflicting rules with Prettier
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: {
//         ...globals.browser,
//       },
//       parser: tseslint.parser,
//       parserOptions: {
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//     },
//     plugins: {
//       'react-hooks': reactHooks,
//       'react-refresh': reactRefresh,
//       prettier: prettier,
//       react: react,
//       '@stylistic': stylistic,
//     },
//     rules: {
//       ...reactHooks.configs.recommended.rules,
//       // Allow blank lines between `{` and `return`
//       '@stylistic/padding-line-between-statements': [
//         'error',
//         { blankLine: 'always', prev: '{', next: 'return' },
//       ],
//       'react-refresh/only-export-components': [
//         'warn',
//         { allowConstantExport: true },
//       ],
//       'prettier/prettier': [
//         'error',
//         {
//           semi: false,
//           singleQuote: true,
//           tabWidth: 2,
//           jsxBracketSameLine: false,
//         },
//         {
//           usePrettierrc: true, // Uses .prettierrc file
//         },
//       ],
//     },
//   }
// )

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import prettierConfig from 'eslint-config-prettier'
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config(
  {
    ignores: ['dist'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
      react: react,
      '@stylistic': stylistic,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'function', next: 'return' },
        { blankLine: 'always', prev: '*', next: 'return' },
      ],
      'no-extra-semi': 'off',
      'lines-between-class-members': 'off',
      'padding-line-between-statements': 'off',
      'prettier/prettier': [
        'error',
        {
          // spread your existing config here
          allowBlankLines: true,
        },
        {
          usePrettierrc: true,
        },
      ],
    },
  }
)
