module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue', 'ts'],
  preset: 'ts-jest',
  moduleDirectories: ['node_modules'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/components/**/*.vue', '<rootDir>/pages/*.vue'],
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg)$': 'jest-static-stubs/jpg',
    '^.+\\.(png)$': 'jest-static-stubs/png',
    '^.+\\.(svg)$': 'identity-obj-proxy',
    '\\.(css)$': '<rootDir>/tests/__mocks__/style.js',
    '@/(.*)': '<rootDir>/app/$1',
    '~/(.*)': '<rootDir>/app/$1',
    '~~/(.*)': '<rootDir>/app/$1',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
  setupFiles: [],
  snapshotSerializers: ['<rootDir>/node_modules/jest-serializer-vue'],
};
