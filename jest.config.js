module.exports = {
  coverageDirectory: "./coverage",
  collectCoverageFrom: ["src/**/*.ts", "src/**/*.tsx", "!**/__tests__/**", "!**/node_modules/**"],
  testEnvironment: "node",
  modulePaths: ["<rootDir>/src", "node_modules"],
  roots: ["src"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest"]
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$",
  coverageReporters: ["json", "lcov", "text"],
  coveragePathIgnorePatterns: [".*/src/.*\\.d\\.ts", ".*/src/testUtil/.*.ts", ".*/src/index.ts", ".*/src/server.ts", ".*/src/mongo.ts"],

  setupFiles: ["dotenv/config"],
  // TODO: increase to 80+ each
  coverageThreshold: {
    global: {
      statements: 1,
      branches: 1,
      functions: 1,
      lines: 1
    }
  },
  testTimeout: 100000
};
