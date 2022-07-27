import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { GoogleMapsService } from '@grid-watch/shared-ui';

import { AccountInformationComponent } from './account-information.component';

describe('AccountInformationComponent', () => {
  let component: AccountInformationComponent;
  let fixture: ComponentFixture<AccountInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountInformationComponent],
      imports: [HttpClientModule, MatDialogModule],
      providers : [FormBuilder, GoogleMapsService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
