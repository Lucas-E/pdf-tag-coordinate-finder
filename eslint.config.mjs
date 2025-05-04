// eslint.config.mjs
import globals from "globals";
import tseslint from "typescript-eslint";
import parser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{ts,js,mjs,cjs}"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.browser,
    },
  },
  ...tseslint.configs.recommended,
  {
    rules: {
      eqeqeq: "off",
      "no-empty": "error",
      "no-unused-vars": "warn",
      "prefer-const": ["warn", { ignoreReadBeforeAssign: true }],
      "@typescript-eslint/no-explicit-any": "off"
    },
  },
  {
    ignores: ["node_modules/**"],
  },
]);
