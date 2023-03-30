module.exports = {
  env: {
    'react-native/react-native': true,
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'prettier',
    'plugin:react-hooks/recommended',
    'plugin:react-redux/recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 7,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
    'simple-import-sort',
    'unused-imports',
    'react-redux',
    'react-hooks',
    'babel',
    'import',
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': { 'babel-module': {} },
  },
  rules: {
    'comma-dangle': 0,
    indent: ['error', 2],
    'no-tabs': 0,
    'react/prefer-stateless-function': 0,
    'react/forbid-prop-types': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    'react/jsx-props-no-spreading': 0,
    'max-len': [
      'error',
      {
        code: 300,
      },
    ],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    'babel/new-cap': 1,
    'babel/camelcase': 1,
    'babel/no-invalid-this': 1,
    'babel/semi': 1,
    'babel/no-unused-expressions': 1,
    'babel/valid-typeof': 1,
  },
};
