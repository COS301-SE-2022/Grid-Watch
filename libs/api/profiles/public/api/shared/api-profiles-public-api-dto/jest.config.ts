module.exports = {
  displayName: 'api-profiles-public-api-shared-api-profiles-public-api-dto',
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
    '../../../../../../../coverage/libs/api/profiles/public/api/shared/api-profiles-public-api-dto',
};
