import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PublicProfileService } from './public-profile.service';

describe('PublicProfileService', () => {
  let service: PublicProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(PublicProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
