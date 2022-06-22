import { TestBed } from '@angular/core/testing';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapsService } from './google-maps.service';

describe('GoogleMapsService', () => {
  let service: GoogleMapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleMapsService]
    });
    service = TestBed.inject(GoogleMapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
