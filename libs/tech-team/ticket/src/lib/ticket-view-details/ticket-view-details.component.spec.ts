import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleMapsService } from '@grid-watch/shared-ui';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
 '@grid-watch/environments';

import { TicketViewDetailsComponent } from './ticket-view-details.component';

describe('TicketViewDetailsComponent', () => {
  let component: TicketViewDetailsComponent;
  let fixture: ComponentFixture<TicketViewDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketViewDetailsComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatDialogModule,
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
      providers: [GoogleMapsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
