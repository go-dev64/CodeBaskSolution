const js = require("@eslint/js");
const eslintConfigPrettier = require("eslint-config-prettier");
const globals = require("globals");

module.exports = [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        require: "readonly", // Déclare require comme globale en lecture seule
        module: "writable", // Déclare module comme globale inscriptible
        __dirname: "readonly", // Déclare __dirname comme globale en lecture seule
      },
    },
    rules: {
      "no-unused-vars": "off",
      "no-prototype-builtins": "off",
      "no-empty": "off",
      "no-useless-escape": "off",
      "no-cond-assign": "off",
    },
  },
];
