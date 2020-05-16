module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'always'
      }
    }],
    'prettier/prettier': ['error', {
      'semi': false,
      'singleQuote': true,
    }],
  }
}
