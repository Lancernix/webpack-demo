module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'no-unused-vars': 'error',
    'no-param-reassign': 'error',
    'no-multiple-empty-lines': ['error', { max: 1 }],
    '@typescript-eslint/no-explicit-any': 'off',
    'no-use-before-define': 'error',
    // 增加这两个规则也可以
    // 'react/react-in-jsx-scope': 'off',
    // 'react/jsx-uses-react': 'off',
  },
};
