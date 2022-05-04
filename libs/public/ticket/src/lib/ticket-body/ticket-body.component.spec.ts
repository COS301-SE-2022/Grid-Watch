import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBodyComponent } from './ticket-body.component';

describe('TicketBodyComponent', () => {
  let component: TicketBodyComponent;
  let fixture: ComponentFixture<TicketBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketBodyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
