import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { AdminViewBodyComponent } from './admin-view-body.component';
import { HttpClientModule } from '@angular/common/http';

describe('AdminViewBodyComponent', () => {
  let component: AdminViewBodyComponent;
  let fixture: ComponentFixture<AdminViewBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminViewBodyComponent],
      imports: [RouterTestingModule, HttpClientModule]
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
