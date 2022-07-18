import { TestBed } from '@angular/core/testing';

import { TechTeamProfileService } from './tech-team-profile.service';

describe('TechTeamProfileService', () => {
  let service: TechTeamProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TechTeamProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
