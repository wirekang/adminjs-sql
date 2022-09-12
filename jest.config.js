/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  globalSetup: './test/utils/setup.ts',
  globalTeardown: './test/utils/teardown.ts',
};
