import { HttpClient} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketViewPageComponent } from './ticket-view-page.component';

describe('TicketViewPageComponent', () => {
  let component: TicketViewPageComponent;
  let fixture: ComponentFixture<TicketViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketViewPageComponent ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
