import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleMapsService } from '@grid-watch/shared-ui';

import { ViewTicketComponent } from './view-ticket.component';

describe('ViewTicketComponent', () => {
  let component: ViewTicketComponent;
  let fixture: ComponentFixture<ViewTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTicketComponent],
      imports : [HttpClientModule, RouterTestingModule, MatMenuModule],
      providers: [GoogleMapsService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
