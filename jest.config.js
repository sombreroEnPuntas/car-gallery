module.exports = {
  collectCoverageFrom: [
    '<rootDir>/pages/*.js',
    '!<rootDir>/.next/',
    '!<rootDir>/apiserver/',
    '!<rootDir>/node_modules/',
  ],
  coverageReporters: ['text', 'lcov'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/apiserver/',
    '<rootDir>/node_modules/',
  ],
}
