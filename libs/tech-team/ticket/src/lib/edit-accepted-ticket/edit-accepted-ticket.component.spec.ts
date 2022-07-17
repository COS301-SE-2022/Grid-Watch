import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleMapsService } from '@grid-watch/shared-ui';

import { EditAcceptedTicketComponent } from './edit-accepted-ticket.component';

describe('EditAcceptedTicketComponent', () => {
  let component: EditAcceptedTicketComponent;
  let fixture: ComponentFixture<EditAcceptedTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAcceptedTicketComponent],
      imports: [HttpClientModule, RouterTestingModule, FormsModule],
      providers: [FormBuilder, GoogleMapsService]
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
