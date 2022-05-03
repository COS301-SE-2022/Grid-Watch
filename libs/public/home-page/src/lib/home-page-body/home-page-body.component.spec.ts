import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageBodyComponent } from './home-page-body.component';

describe('HomePageBodyComponent', () => {
  let component: HomePageBodyComponent;
  let fixture: ComponentFixture<HomePageBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageBodyComponent],
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
