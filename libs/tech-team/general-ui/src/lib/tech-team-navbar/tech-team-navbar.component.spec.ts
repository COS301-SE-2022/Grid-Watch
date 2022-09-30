import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTeamNavbarComponent } from './tech-team-navbar.component';

describe('TechTeamNavbarComponent', () => {
  let component: TechTeamNavbarComponent;
  let fixture: ComponentFixture<TechTeamNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechTeamNavbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechTeamNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
