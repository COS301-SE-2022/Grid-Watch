import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleMapsService } from '@grid-watch/shared-ui';
 '@grid-watch/environments';

import { MyTicketsListComponent } from './my-tickets-list.component';

describe('MyTicketsListComponent', () => {
  let component: MyTicketsListComponent;
  let fixture: ComponentFixture<MyTicketsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyTicketsListComponent],
      imports :[HttpClientModule, RouterTestingModule, AngularFireStorageModule, AngularFireModule.initializeApp({
    apiKey: "AIzaSyB5VKBU78lomWEVrtiUOYIglrM2VdC0jI8",
    authDomain: "epi-use-c9dfa.firebaseapp.com",
    projectId: "epi-use-c9dfa",
    storageBucket: "epi-use-c9dfa.appspot.com",
    messagingSenderId: "342205045804",
    appId: "1:342205045804:web:b401e9bde4216d489a8589",
    measurementId: "G-JW453VRZD1"
  })],
      providers : [GoogleMapsService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTicketsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
