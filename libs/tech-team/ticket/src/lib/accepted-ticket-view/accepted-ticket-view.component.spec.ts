import {HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleMapsService } from '@grid-watch/shared-ui';

import { AcceptedTicketViewComponent } from './accepted-ticket-view.component';

describe('AcceptedTicketViewComponent', () => {
  let component: AcceptedTicketViewComponent;
  let fixture: ComponentFixture<AcceptedTicketViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptedTicketViewComponent],
      imports: [RouterTestingModule, HttpClientModule],
      providers: [GoogleMapsService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptedTicketViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
