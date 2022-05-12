import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterModule } from '@nestjs/core';

import { AdminViewBodyComponent } from './admin-view-body.component';

describe('AdminViewBodyComponent', () => {
  let component: AdminViewBodyComponent;
  let fixture: ComponentFixture<AdminViewBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminViewBodyComponent],
      imports: [RouterModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
