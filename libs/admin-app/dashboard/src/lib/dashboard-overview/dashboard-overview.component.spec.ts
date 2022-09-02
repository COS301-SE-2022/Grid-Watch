import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardOverviewComponent } from './dashboard-overview.component';
import {Chart, registerables} from 'chart.js';
import {HttpClientModule} from '@angular/common/http';
import {GoogleMapsService} from '@grid-watch/shared-ui';


describe('DashboardOverviewComponent', () => {
  let component: DashboardOverviewComponent;
  let fixture: ComponentFixture<DashboardOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardOverviewComponent],
      imports: [HttpClientModule],
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
