import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { EditTicketComponent } from './edit-ticket.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';

describe('EditTicketComponent', () => {
  let component: EditTicketComponent;
  let fixture: ComponentFixture<EditTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTicketComponent],
      imports: [RouterTestingModule, HttpClientModule, GoogleMapsModule, FormsModule]
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
