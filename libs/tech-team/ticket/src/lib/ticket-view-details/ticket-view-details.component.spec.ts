import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketViewDetailsComponent } from './ticket-view-details.component';

describe('TicketViewDetailsComponent', () => {
  let component: TicketViewDetailsComponent;
  let fixture: ComponentFixture<TicketViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketViewDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
