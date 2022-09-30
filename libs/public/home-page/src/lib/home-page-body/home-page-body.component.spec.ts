import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapsService } from '@grid-watch/shared-ui';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
 '@grid-watch/environments';

import { HomePageBodyComponent } from './home-page-body.component';

describe('HomePageBodyComponent', () => {
  let component: HomePageBodyComponent;
  let fixture: ComponentFixture<HomePageBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageBodyComponent],

      imports: [RouterTestingModule, HttpClientModule, GoogleMapsModule,
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
        AngularFirestoreModule,],
      providers: [FormBuilder, GoogleMapsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
