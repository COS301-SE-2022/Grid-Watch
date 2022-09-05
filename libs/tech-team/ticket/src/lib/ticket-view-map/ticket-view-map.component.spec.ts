import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleMapsService } from '@grid-watch/shared-ui';

import { TicketViewMapComponent } from './ticket-view-map.component';

describe('TicketViewMapComponent', () => {
  let component: TicketViewMapComponent;
  let fixture: ComponentFixture<TicketViewMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketViewMapComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [GoogleMapsService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketViewMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
