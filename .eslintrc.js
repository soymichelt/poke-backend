module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'complexity': ['error', 10],
    'eqeqeq': 'error',
    'max-depth': ['error', 3],
    'max-lines-per-function': [
      'warn',
      {
        max: 50,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    'max-params': ['error', 10],
    'no-use-before-define': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'warn',
    'prefer-spread': 'warn',
    'prefer-template': 'error',
    'semi': 'off',
  },
};
