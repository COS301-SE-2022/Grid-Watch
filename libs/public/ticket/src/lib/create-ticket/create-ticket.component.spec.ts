import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateTicketComponent } from './create-ticket.component';

describe('CreateTicketComponent', () => {
  let component: CreateTicketComponent;
  let fixture: ComponentFixture<CreateTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTicketComponent],
      imports: [RouterTestingModule, HttpClientModule, GoogleMapsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CreateTicketComponent component', () => {
    const script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDoV4Ksi2XO7UmYfl4Tue5JhDjKW57DlTE&libraries=places";
    script.async = true;

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
