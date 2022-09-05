import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTeamPageComponent } from './tech-team-page.component';

describe('TechTeamPageComponent', () => {
  let component: TechTeamPageComponent;
  let fixture: ComponentFixture<TechTeamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TechTeamPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
