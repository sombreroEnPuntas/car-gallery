const ignored = [
  '<rootDir>/.next/',
  '<rootDir>/apiserver/',
  '<rootDir>/coverage/',
  '<rootDir>/data/constants.js',
  '<rootDir>/data/mocks.js',
  '<rootDir>/jest.*',
  '<rootDir>/node_modules/',
  '<rootDir>/pages/_document.js',
]

module.exports = {
  collectCoverageFrom: ['<rootDir>/**/*.js'],
  coveragePathIgnorePatterns: ignored,
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
  testPathIgnorePatterns: ignored,
}
