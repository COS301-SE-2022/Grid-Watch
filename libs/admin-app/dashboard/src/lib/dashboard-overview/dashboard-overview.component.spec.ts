import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardOverviewComponent } from './dashboard-overview.component';
import {Chart, registerables} from 'chart.js';
import {HttpClientModule} from '@angular/common/http';
import {GoogleMapsService} from '@grid-watch/shared-ui';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
 '@grid-watch/environments';

describe('DashboardOverviewComponent', () => {
  let component: DashboardOverviewComponent;
  let fixture: ComponentFixture<DashboardOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardOverviewComponent],
      imports: [HttpClientModule,
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
        AngularFirestoreModule],
      providers: [GoogleMapsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
