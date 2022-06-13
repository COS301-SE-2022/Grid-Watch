import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MenuOptionsComponent } from './menu-options.component';

describe('MenuOptionsComponent', () => {
  let component: MenuOptionsComponent;
  let fixture: ComponentFixture<MenuOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuOptionsComponent],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
