import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { EditTicketComponent } from './edit-ticket.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormBuilder, FormsModule } from '@angular/forms';
import { GoogleMapsService } from '@grid-watch/shared-ui';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

describe('EditTicketComponent', () => {
  let component: EditTicketComponent;
  let fixture: ComponentFixture<EditTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTicketComponent],
      imports: [RouterTestingModule, BrowserAnimationsModule, HttpClientModule, GoogleMapsModule, FormsModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatIconModule],
      providers: [FormBuilder, GoogleMapsService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
