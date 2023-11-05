module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
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
      files: ['.eslintrc.{js,cjs}', '**/src/**/*.{test,stories}.{ts,tsx}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  // parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.eslint.json',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    'i18next',
    '@typescript-eslint',
    'react-hooks',
    'bright-plugin'
    // 'ulbi-tv-plugin'
    // 'tikhon-plugin'
  ],
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
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-trailing-spaces': 'warn',
    // semi: 'on',
    // '@typescript-eslint/semi': 'error',
    // indent: [2, 4],
    // 'react/jsx-filename-extension': [
    // 2,
    // { extensions: ['.js', '.jsx', '.tsx'] },
    // ],
    // 'import/no-unresolved': 'off',
    // 'import/prefer-default-export': 'off',
    // 'react/require-default-props': 'off',
    // 'react/react-in-jsx-scope': 'off',
    // 'react/jsx-props-no-spreading': 'warn',
    // 'react/function-component-definition': 'off',
    // 'no-shadow': 'off',
    // 'import/extensions': 'off',
    // 'import/no-extraneous-dependencies': 'off',
    // 'max-len': ['error', { ignoreComments: true, code: 120 }],
    '@typescript-eslint/prefer-ts-expect-error': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/display-name': 'off',
    'no-underscore-dangle': 'off',
    'i18next/no-literal-string': ['error', { markupOnly: true }],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'space-before-function-paren': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    indent: 'off',
    '@typescript-eslint/indent': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'multiline-ternary': 'off',
    '@typescript-eslint/no-floating-promises': 'off', // обнаруживает только необработанные операторы Promise
    // мои правила
    'bright-plugin/path-checker': 'error'
    // 'tikhon-plugin/path-checker': 'error'
    // 'ulbi-tv-plugin/path-checker': 'error'
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
