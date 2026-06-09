export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    // Use ts-jest to transform TypeScript files
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    // Handle CSS imports (requires a mock file, see Step 3)
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    // Handle asset imports like images
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/__mocks__/fileMock.js",
    // If you use paths/aliases in vite.config (like @/components), map them here:
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  // Runs special setup files before each test
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
