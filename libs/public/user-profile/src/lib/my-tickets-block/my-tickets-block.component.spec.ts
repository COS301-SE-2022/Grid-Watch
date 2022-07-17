import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleMapsService } from '@grid-watch/shared-ui';

import { MyTicketsBlockComponent } from './my-tickets-block.component';

describe('MyTicketsBlockComponent', () => {
  let component: MyTicketsBlockComponent;
  let fixture: ComponentFixture<MyTicketsBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyTicketsBlockComponent],
      imports: [HttpClientModule],
      providers : [GoogleMapsService]
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
