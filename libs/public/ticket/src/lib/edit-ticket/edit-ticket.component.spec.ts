import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@nestjs/core';
import { RouterTestingModule } from "@angular/router/testing";
import { EditTicketComponent } from './edit-ticket.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('EditTicketComponent', () => {
  let component: EditTicketComponent;
  let fixture: ComponentFixture<EditTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditTicketComponent],
      imports: [RouterTestingModule, HttpClientModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
