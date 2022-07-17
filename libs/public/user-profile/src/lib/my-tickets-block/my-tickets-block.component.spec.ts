import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTicketsBlockComponent } from './my-tickets-block.component';

describe('MyTicketsBlockComponent', () => {
  let component: MyTicketsBlockComponent;
  let fixture: ComponentFixture<MyTicketsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyTicketsBlockComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTicketsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
