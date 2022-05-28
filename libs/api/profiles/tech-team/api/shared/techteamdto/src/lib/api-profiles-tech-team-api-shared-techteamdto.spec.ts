import { techTeamDto } from './api-profiles-tech-team-api-shared-techteamdto';

describe('ApiProfilesTechTeamApiDto', () => {
  it('should be defined', () => {
    expect(new techTeamDto()).toBeDefined();
  });
});
