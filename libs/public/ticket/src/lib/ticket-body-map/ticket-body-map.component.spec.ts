import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBodyMapComponent } from './ticket-body-map.component';

describe('TicketBodyMapComponent', () => {
  let component: TicketBodyMapComponent;
  let fixture: ComponentFixture<TicketBodyMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketBodyMapComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketBodyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
