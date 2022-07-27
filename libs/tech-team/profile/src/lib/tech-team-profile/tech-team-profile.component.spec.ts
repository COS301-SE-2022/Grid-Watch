import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';
import { RouterTestingModule } from '@angular/router/testing';

import { TechTeamProfileComponent } from './tech-team-profile.component';

describe('TechTeamProfileComponent', () => {
  let component: TechTeamProfileComponent;
  let fixture: ComponentFixture<TechTeamProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechTeamProfileComponent],
      imports : [HttpClientModule, RouterTestingModule, MatMenuModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechTeamProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
