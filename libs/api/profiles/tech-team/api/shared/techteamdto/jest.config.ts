/* eslint-disable */
export default {
  displayName: 'api-profiles-tech-team-api-shared-techteamdto',
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
    '../../../../../../../coverage/libs/api/profiles/tech-team/api/shared/techteamdto',
};
