import type { Config } from "jest";

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: false }],
  },
};

export default config;
