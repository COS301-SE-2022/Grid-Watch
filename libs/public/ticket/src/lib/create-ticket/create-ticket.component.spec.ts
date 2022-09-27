import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsModule } from '@angular/google-maps';
import { RouterTestingModule } from '@angular/router/testing';
import { Loader } from '@googlemaps/js-api-loader';
import { CreateTicketComponent } from './create-ticket.component';
import {} from '@googlemaps/js-api-loader';
import {} from '@angular/google-maps';
import { FormBuilder } from '@angular/forms';
import { GoogleMapsService } from '@grid-watch/shared-ui';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
 '@grid-watch/environments';

describe('CreateTicketComponent', () => {
  let component: CreateTicketComponent;
  let fixture: ComponentFixture<CreateTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTicketComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        GoogleMapsModule,
        MatDialogModule,
        NgbModule,
        AngularFireModule,
        AngularFireModule.initializeApp({
    apiKey: "AIzaSyB5VKBU78lomWEVrtiUOYIglrM2VdC0jI8",
    authDomain: "epi-use-c9dfa.firebaseapp.com",
    projectId: "epi-use-c9dfa",
    storageBucket: "epi-use-c9dfa.appspot.com",
    messagingSenderId: "342205045804",
    appId: "1:342205045804:web:b401e9bde4216d489a8589",
    measurementId: "G-JW453VRZD1"
  }),
        AngularFirestoreModule,
      ],
      providers: [FormBuilder, GoogleMapsService],
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
