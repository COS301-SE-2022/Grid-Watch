import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAcceptedTicketComponent } from './edit-accepted-ticket.component';

describe('EditAcceptedTicketComponent', () => {
  let component: EditAcceptedTicketComponent;
  let fixture: ComponentFixture<EditAcceptedTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAcceptedTicketComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAcceptedTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
