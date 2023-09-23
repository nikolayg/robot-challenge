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

  coverageThreshold: {
    global: {
      statements: 70,
      branches: 70,
      functions: 70,
      lines: 70
    }
  },
  testTimeout: 10000
};
