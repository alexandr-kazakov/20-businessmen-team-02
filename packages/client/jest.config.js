import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '^@/app/(.*)': '<rootDir>/src/app/$1',
    '^@/components/(.*)': '<rootDir>/src/components/$1',
    '^@/pages/(.*)': '<rootDir>/src/pages/$1',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}
