module.exports = {
    extends: [
      'airbnb-base',
      'prettier/react',
      'plugin:react/recommended',
      'plugin:prettier/recommended'
    ],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': ['error'],
      'class-methods-use-this': 0,
      'no-console': 0,
      'react/prop-types': 0,
      'no-underscore-dangle': 1,
      'react/no-string-refs': 1,
      'no-useless-escape': 1,
      'no-case-declarations': 1
    },
    settings: {
      react: {
        version: '16.9.0'
      }
    },
    parser: 'babel-eslint',
    env: {
      jest: true,
      browser: true,
      node: true
    }
  };