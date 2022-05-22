import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedTicketViewComponent } from './accepted-ticket-view.component';

describe('AcceptedTicketViewComponent', () => {
  let component: AcceptedTicketViewComponent;
  let fixture: ComponentFixture<AcceptedTicketViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptedTicketViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedTicketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
