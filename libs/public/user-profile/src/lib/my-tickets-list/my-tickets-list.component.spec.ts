import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleMapsService } from '@grid-watch/shared-ui';

import { MyTicketsListComponent } from './my-tickets-list.component';

describe('MyTicketsListComponent', () => {
  let component: MyTicketsListComponent;
  let fixture: ComponentFixture<MyTicketsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyTicketsListComponent],
      imports :[HttpClientModule, RouterTestingModule],
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
