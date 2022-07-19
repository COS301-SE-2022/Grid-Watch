import {  HttpClientModule} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing'
import { GoogleMapsService } from '@grid-watch/shared-ui';

import { TicketViewPageComponent } from './ticket-view-page.component';

describe('TicketViewPageComponent', () => {
  let component: TicketViewPageComponent;
  let fixture: ComponentFixture<TicketViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketViewPageComponent, ],
      imports: [RouterTestingModule, HttpClientModule ],
      providers: [GoogleMapsService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
