import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";
import { rules } from "eslint-plugin-react/configs/all";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        rules: {
          ...rules,
          "prettier/prettier": [
            "error",
            {
              endOfLine: "auto",
            },
          ],
        },
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
];
