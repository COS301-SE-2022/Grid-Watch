import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleMapsService } from '@grid-watch/shared-ui';

import { TicketBodyListComponent } from './ticket-body-list.component';

describe('TicketBodyListComponent', () => {
  let component: TicketBodyListComponent;
  let fixture: ComponentFixture<TicketBodyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketBodyListComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [GoogleMapsService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketBodyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
