/* eslint-disable */
export default {
  displayName: 'api-profiles-admin-api-shared-api-profiles-admin-api-dto',
  preset: '../../../../../../../jest.preset.js',
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
    '../../../../../../../coverage/libs/api/profiles/admin/api/shared/api-profiles-admin-api-dto',
};
