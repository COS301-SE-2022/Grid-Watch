import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TicketService } from './ticket.service';

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule]
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
