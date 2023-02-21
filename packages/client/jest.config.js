import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    '^@/app/(.*)': '<rootDir>/src/app/$1',
    '^@/components/(.*)': '<rootDir>/src/components/$1',
    '^@/pages/(.*)': '<rootDir>/src/pages/$1',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}
