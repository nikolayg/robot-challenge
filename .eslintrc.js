module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    jsx: false
  },
  plugins: ["@typescript-eslint", "sonarjs"],
  rules: {
    "max-len": [
      "error",
      {
        code: 180,
        ignoreComments: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    "no-throw-literal": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }]
  },
  extends: ["plugin:@typescript-eslint/recommended", "prettier", "prettier/@typescript-eslint", "plugin:prettier/recommended", "plugin:sonarjs/recommended"]
};
