module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:react/recommended',
    'plugin:i18next/recommended',
    'plugin:storybook/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    project: 'tsconfig.eslint.json',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'i18next', '@typescript-eslint', 'react-hooks'],
  rules: {
    // отключает правило, требующее обязательный импорт React при использовании JSX.
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    // отступы ( первым аргументом передается от 0 до 2,
    // где 0 -правило выключено, 1 - warning, 2 - правило включено
    // второй аргумент - количество пробелов)
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2], // отступы в пропсах
    // отключает правило типизировать возврат функции
    // '@typescript-eslint/explicit-function-return-type': 'off',
    // отключает правило фигурных скобок в стрелочных функциях
    '@typescript-eslint/no-confusing-void-expression': 'off',
    // Это правило запрещает предоставлять обещания в логических местах, таких как операторы if, в
    // тех местах, где компилятор TypeScript разрешает их использование, но они не обрабатываются
    // должным образом
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'warn',
    // semi: 'on',
    // '@typescript-eslint/semi': 'error',
    // indent: [2, 4],
    // 'react/jsx-filename-extension': [
    // 2,
    // { extensions: ['.js', '.jsx', '.tsx'] },
    // ],
    // 'import/no-unresolved': 'off',
    // 'import/prefer-default-export': 'off',
    // 'no-unused-vars': 'warn',
    // 'react/require-default-props': 'off',
    // 'react/react-in-jsx-scope': 'off',
    // 'react/jsx-props-no-spreading': 'warn',
    // 'react/function-component-definition': 'off',
    // 'no-shadow': 'off',
    // 'import/extensions': 'off',
    // 'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    'i18next/no-literal-string': ['error', { markupOnly: true }],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    indent: 'off',
    '@typescript-eslint/indent': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    'multiline-ternary': 'off'
  },
  globals: {
    __IS_DEV__: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
