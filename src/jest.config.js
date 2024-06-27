module.exports = {
  // The root directory that Jest should scan for tests and modules within
  roots: ["<rootDir>/src"],

  // File extensions that Jest should look for
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],

  // Directories that Jest should ignore when searching for files
  testPathIgnorePatterns: ["/node_modules/"],

  // Test environment setup
  testEnvironment: "jsdom", // Use 'node' if testing Node.js-specific code

  // Transform files with babel-jest for better ES6+ support
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },

  // Setup for TypeScript if your project uses TypeScript
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json", // Path to your tsconfig.json file
    },
  },

  // Test coverage configuration
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!**/node_modules/**"],

  // Clear mocks between tests
  clearMocks: true,
  moduleNameMapper: {
    axios: "axios/dist/node/axios.cjs",
  },
};
