module.exports = {
  displayName: 'api-ai-ticket-api-shared-api-ai-ticket-api-dto',
  preset: '../../../../../../../jest.preset.ts',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory:
    '../../../../../../../coverage/libs/api/ai/ticket/api/shared/api-ai-ticket-api-dto',
};
