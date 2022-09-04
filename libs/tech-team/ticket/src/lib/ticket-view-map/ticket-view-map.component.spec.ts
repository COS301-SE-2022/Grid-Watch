import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketViewMapComponent } from './ticket-view-map.component';

describe('TicketViewMapComponent', () => {
  let component: TicketViewMapComponent;
  let fixture: ComponentFixture<TicketViewMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketViewMapComponent],
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
