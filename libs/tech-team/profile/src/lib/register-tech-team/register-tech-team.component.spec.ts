import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterTechTeamComponent } from './register-tech-team.component';

describe('RegisterTechTeamComponent', () => {
  let component: RegisterTechTeamComponent;
  let fixture: ComponentFixture<RegisterTechTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterTechTeamComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTechTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
