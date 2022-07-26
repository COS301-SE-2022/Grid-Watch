import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBodyComponent } from './ticket-body.component';

import {MatCardHarness} from '@angular/material/card/testing';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GoogleMapsService } from '@grid-watch/shared-ui';
import { RouterTestingModule } from '@angular/router/testing';

describe('TicketBodyComponent', () => {
  let component: TicketBodyComponent;
  let fixture: ComponentFixture<TicketBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TicketBodyComponent],
      imports: [MatCardModule, HttpClientModule, RouterTestingModule],
      providers: [GoogleMapsService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create TicketBodyComponent component', () => {
    expect(component).toBeTruthy();
  });

  // it('should contain create ticket button', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const element = bannerElement.querySelector("#create_ticket");
  //   const elements = element?.getElementsByTagName("button");
  //   expect(element).toBeTruthy();
  //   expect(elements?.item(0)?.type).toBe("button");
  //   expect(elements?.item(0)?.innerHTML).toBe("Create ticket");
  // });

  // it('should contain issue card', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const element = bannerElement.querySelector(".issue_card");
  //   const elements = element?.children;
  //   expect(element).toBeTruthy();
  //   expect(elements?.length).toBe(3);
  // });

  // it('should contain issue card-header', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const element = bannerElement.querySelector(".issue_card");
  //   const elements = element?.children;
  //   expect(elements?.item(0)?.tagName).toBe("MAT-CARD-HEADER");
  // });

  // it('should contain issue card-header avatar ', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const element = bannerElement.querySelector(".issue_card");
  //   const elements = element?.children;
  //   const children = elements?.item(0)?.children;
  //   expect(children?.item(0)?.tagName).toBe("DIV");
  //   expect(children?.item(0)?.className).toBe("mat-card-avatar");
  // });

  // it('should contain issue card-header title ', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const element = bannerElement.querySelector("mat-card-title");
  //   expect(element).toBeTruthy();
  // });

  // it('should contain issue card-header subtitle ', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const element = bannerElement.querySelector("mat-card-subtitle");
  //   expect(element).toBeTruthy();
  // });
  
  // it('should contain issue card-content', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const element = bannerElement.querySelector("mat-card-content");
  //   expect(element).toBeTruthy();
  // });

  // it('should contain issue card-footer', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const element = bannerElement.querySelector("mat-card-footer");
  //   expect(element).toBeTruthy();
  // });



});
