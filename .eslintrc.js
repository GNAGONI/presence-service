module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'arrow-parens': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
    'linebreak-style': 0,
    'no-unused-vars': 0,
  },
};
