import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatOption, MatOptionModule } from '@angular/material/core';
import {  MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateTicketComponent } from './create-ticket.component';

describe('CreateTicketComponent', () => {
  let component: CreateTicketComponent;
  let fixture: ComponentFixture<CreateTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTicketComponent],
      imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, BrowserAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
