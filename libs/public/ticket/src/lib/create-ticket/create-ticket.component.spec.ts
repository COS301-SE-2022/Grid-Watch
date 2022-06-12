import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatOption, MatOptionModule } from '@angular/material/core';
import {  MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateTicketComponent } from './create-ticket.component';

describe('CreateTicketComponent', () => {
  let component: CreateTicketComponent;
  let fixture: ComponentFixture<CreateTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTicketComponent],
      imports: [RouterTestingModule, HttpClientModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CreateTicketComponent component', () => {
    expect(component).toBeTruthy();
  });

  it('should check if create Ticket URL is correct', () => {
    expect(component.createTicketURL).toEqual("http://localhost:3333/api/ticket/create");
  });

  it('should check if upload image URL is correct', () => {
    expect(component.uploadURL).toEqual("http://localhost:3333/api/ticket/upload");
  });

  // it('should check if ngOnInit initalises fields properly', () => {
  //   expect(component.defaultUpload).toEqual("assets/upload-solid.svg");
  //   expect(component.other).toBeFalsy();
  //   expect(component.other_details).toEqual("");
  // });
  

  // it('should detect file input change', () => {
  //   const input = document.getElementById("issue_uploaded_img") as HTMLInputElement;
  //   const str = JSON.stringify({test : "test"});
  //   const blob = new Blob([str]);
  //   const file = new File([blob], 'values.json', {
  //     type: 'application/JSON',
  //   });
  //   const spy = jest.spyOn(component,"fileUploaded");
  //   input.files = 
  //   expect(spy).toHaveBeenCalled();
  // });
  

  
  
});
