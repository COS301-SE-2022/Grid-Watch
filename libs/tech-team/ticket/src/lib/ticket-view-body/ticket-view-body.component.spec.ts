import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketViewBodyComponent } from './ticket-view-body.component';

describe('TicketViewBodyComponent', () => {
  let component: TicketViewBodyComponent;
  let fixture: ComponentFixture<TicketViewBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketViewBodyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketViewBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
