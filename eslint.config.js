import antfu from "@antfu/eslint-config";
import prettierConfig from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";

export default antfu(
  {
    typescript: true,
    vue: true,
    prettier: true,
    ignores: [
      // "**/fixtures",
      // ...globs
    ],
  },
  {
    files: ["**/*.{js,ts,vue}"],
    plugins: {
      prettier,
    },
    rules: {
      // "prettier/prettier": [
      //   "error",
      //   {
      //     semi: true,
      //     singleQuote: false,
      //     tabWidth: 2,
      //     trailingComma: "es6",
      //     printWidth: 100,
      //     endOfLine: "auto",
      //   },
      // ],
      "antfu/if-newline": "off",

      "style/quotes": "off",
      "style/semi": "off",
      "style/comma-dangle": "off",
      "style/operator-linebreak": "off",
      "style/brace-style": "off",

      "vue/block-order": "off",
      "vue/multi-word-component-names": "off",
      "vue/no-multiple-template-root": "off",

      "no-console": "warn",
    },
  },
  prettierConfig
);
