import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewBodyComponent } from './admin-view-body.component';

describe('AdminViewBodyComponent', () => {
  let component: AdminViewBodyComponent;
  let fixture: ComponentFixture<AdminViewBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminViewBodyComponent],
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
