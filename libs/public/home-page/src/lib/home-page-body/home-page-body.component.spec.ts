import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsService } from '@grid-watch/shared-ui';

import { HomePageBodyComponent } from './home-page-body.component';

describe('HomePageBodyComponent', () => {
  let component: HomePageBodyComponent;
  let fixture: ComponentFixture<HomePageBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageBodyComponent],
      imports: [HttpClientModule],
      providers: [GoogleMapsService]
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

