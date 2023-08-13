module.exports = {
  extends: [
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript",
    "next/core-web-vitals",
    "plugin:eslint-comments/recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier"
  ],

  env: { browser: true },
  ignorePatterns: ["!.*"],
  parser: "@typescript-eslint/parser",

  parserOptions: {
    ecmaVersion: 2020,
    project: "./tsconfig.eslint.json"
  },

  plugins: ["@typescript-eslint", "eslint-comments"],

  rules: {
    "@typescript-eslint/non-nullable-type-assertion-style": "off",
    "import/prefer-default-export": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    "react/jsx-no-bind": "off",
    "react/jsx-props-no-spreading": "off",
    "no-param-reassign": "off",
    "jsx-a11y/anchor-is-valid": "off",

    "import/extensions": [
      "error",
      "always",
      {
        ts: "never",
        tsx: "never",
        js: "never",
        jsx: "never"
      }
    ],

    "import/no-unresolved": "error",
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true }
    ],

    "no-restricted-syntax": "off",
    "arrow-parens": ["error", "always"],
    semi: ["error", "never"],
    quotes: ["error", "double"]
  },

  root: true,

  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".ts", ".tsx", ".js", ".jsx"]
      }
    }
  }
}
