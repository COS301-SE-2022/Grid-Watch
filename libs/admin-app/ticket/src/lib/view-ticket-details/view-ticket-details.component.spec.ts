import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ViewTicketDetailsComponent } from './view-ticket-details.component';

describe('ViewTicketDetailsComponent', () => {
  let component: ViewTicketDetailsComponent;
  let fixture: ComponentFixture<ViewTicketDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewTicketDetailsComponent],
      imports: [HttpClientModule, RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTicketDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
