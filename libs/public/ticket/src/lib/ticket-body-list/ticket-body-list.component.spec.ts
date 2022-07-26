import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBodyListComponent } from './ticket-body-list.component';

describe('TicketBodyListComponent', () => {
  let component: TicketBodyListComponent;
  let fixture: ComponentFixture<TicketBodyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketBodyListComponent],
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
