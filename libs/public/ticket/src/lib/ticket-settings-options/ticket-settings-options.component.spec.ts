import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSettingsOptionsComponent } from './ticket-settings-options.component';

describe('TicketSettingsOptionsComponent', () => {
  let component: TicketSettingsOptionsComponent;
  let fixture: ComponentFixture<TicketSettingsOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketSettingsOptionsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketSettingsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
