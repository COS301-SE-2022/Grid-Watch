import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { AdminViewBodyComponent } from './admin-view-body.component';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsService } from '@grid-watch/shared-ui';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AdminViewBodyComponent', () => {
  let component: AdminViewBodyComponent;
  let fixture: ComponentFixture<AdminViewBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminViewBodyComponent],
      imports: [RouterTestingModule, BrowserAnimationsModule , HttpClientModule, MatSidenavModule, MatDividerModule, MatTableModule],
      providers: [GoogleMapsService]
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
