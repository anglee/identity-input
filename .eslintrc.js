module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'airbnb',
    // "eslint:recommended",
    // "plugin:react/recommended",
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  rules: {
    'no-console': ['error'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'no-unused-vars': ['off'],
    '@typescript-eslint/no-empty-interface': ['off'],

    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    // "@typescript-eslint/no-unused-vars": ["off"],

    '@typescript-eslint/explicit-function-return-type': [
      'off', // TODO: turn this on
      {
        allowExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
    '@typescript-eslint/interface-name-prefix': ['off'],
    'react/destructuring-assignment': ['off'],
    'react/state-in-constructor': ['off'],
    'react/jsx-boolean-value': ['off'],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: { array: false, object: true },
        AssignmentExpression: { array: false, object: false },
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
