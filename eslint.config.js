// https://docs.expo.dev/guides/using-eslint/
import expoConfig from "eslint-config-expo/flat";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";

export default defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["**/*.js", "node_modules", "build", "/.expo"],
    rules: {
      "no-use-before-define": "error",
      "@typescript-eslint/no-use-before-define": ["error"],
      "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
        },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/prefer-default-export": "off",
      "no-unused-vars": "warn",
      "react/prop-types": "off",

      "jsx-a11y/label-has-associated-control": [
        "error",
        {
          required: {
            some: ["nesting", "id"],
          },
        },
      ],
      "jsx-a11y/label-has-for": [
        "error",
        {
          required: {
            some: ["nesting", "id"],
          },
        },
      ],
      "react/jsx-props-no-spreading": "off",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      "import/no-unresolved": "off",
      "react/style-prop-object": "off",
      "react/function-component-definition": [
        2,
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/jsx-no-useless-fragment": "off",
      "react/require-default-props": "off",
    },
  },
]);
