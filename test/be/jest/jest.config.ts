import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/../../../$1',
  },
  setupFiles: ['<rootDir>/setup.ts'],
  testMatch: ['**/*.test.ts'],
}

export default config
