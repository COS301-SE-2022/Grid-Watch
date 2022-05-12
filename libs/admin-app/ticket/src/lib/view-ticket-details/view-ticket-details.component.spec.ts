import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTicketDetailsComponent } from './view-ticket-details.component';

describe('ViewTicketDetailsComponent', () => {
  let component: ViewTicketDetailsComponent;
  let fixture: ComponentFixture<ViewTicketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTicketDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
