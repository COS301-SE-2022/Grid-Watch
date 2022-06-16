import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterTestingModule } from '@angular/router/testing';
import { Loader } from '@googlemaps/js-api-loader';
import { CreateTicketComponent } from './create-ticket.component';
import {} from '@googlemaps/js-api-loader';
import {} from  '@angular/google-maps';
import { FormBuilder } from '@angular/forms';

describe('CreateTicketComponent', () => {
  let component: CreateTicketComponent;
  let fixture: ComponentFixture<CreateTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTicketComponent],
      imports: [RouterTestingModule, HttpClientModule, GoogleMapsModule],
      providers: [FormBuilder]
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
