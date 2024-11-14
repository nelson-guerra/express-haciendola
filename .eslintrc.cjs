module.exports = {
   env: {
      node: true,
      es2021: true,
   },
   extends: ['plugin:prettier/recommended', 'plugin:@typescript-eslint/recommended', 'eslint:recommended'],
   parser: '@typescript-eslint/parser',
   parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      project: 'tsconfig.json',
   },
   plugins: ['@typescript-eslint'],
   rules: {
      'no-var': 'error',
      semi: [2, 'always'],
      'no-multi-spaces': 'error',
      'space-in-parens': 'error',
      'no-multiple-empty-lines': 'error',
      'prefer-const': 'error',
      'no-unused-vars': [
         'error',
         {
            vars: 'all',
            args: 'after-used',
            caughtErrors: 'all',
            ignoreRestSiblings: false,
            reportUsedIgnorePattern: false,
         },
      ],
   },
};
