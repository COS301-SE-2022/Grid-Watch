import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatOption, MatOptionModule } from '@angular/material/core';
import {  MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateTicketComponent } from './create-ticket.component';

describe('CreateTicketComponent', () => {
  let component: CreateTicketComponent;
  let fixture: ComponentFixture<CreateTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTicketComponent],
      imports: [HttpClientModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, BrowserAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CreateTicketComponent component', () => {
    expect(component).toBeTruthy();
  });
  
  // it('should contain deafult upload link "assets/upload-solid.svg"', () => {
  //   expect(component.default_upload).toBe("assets/upload-solid.svg");
  // });
  
  // it('should contain name input element', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const name_input = bannerElement.querySelector("#name_field");
  //   expect(name_input).toBeTruthy();
  //   const name_input_label = name_input?.getElementsByTagName("mat-label");
  // });
  
  // it('should contain name input element label', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const name_input = bannerElement.querySelector("#name_field");
  //   const name_input_label = name_input?.getElementsByTagName("mat-label");
  //   expect(name_input_label?.item(0)?.innerHTML).toBe("Name");
  // });

  // it('should contain issue type element', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const issue_field = bannerElement.querySelector("#issue_field");
  //   expect(issue_field).toBeTruthy();
  // });

  // it('should contain issue type element label', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const issue_field = bannerElement.querySelector("#issue_field");
  //   const issue_input_label = issue_field?.getElementsByTagName("mat-label");
  //   expect(issue_input_label?.item(0)?.innerHTML).toBe("Issue Type");
  // });

  // it('should contain Description field element', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const desc_field = bannerElement.querySelector("#description_field");
  //   expect(desc_field).toBeTruthy();
  // });

  // it('should contain Description field element label', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const desc_field = bannerElement.querySelector("#description_field");
  //   const desc_field_label = desc_field?.getElementsByTagName("mat-label");
  //   expect(desc_field_label?.item(0)?.innerHTML).toBe("Description");
  // });

  // it('should contain upload image component', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const upload_image = bannerElement.querySelector("#upload_image");
  //   expect(upload_image).toBeTruthy();
  // });

  // it('should contain upload image component label', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const upload_image = bannerElement.querySelector("#upload_image");
  //   const upload_image_label = upload_image?.getElementsByTagName("mat-label");
  //   expect(upload_image_label?.item(0)?.innerHTML).toBe("Upload image of issue");
  // });

  // it('should contain upload image component input', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const upload_image = bannerElement.querySelector("#upload_image");
  //   const upload_image_input = upload_image?.getElementsByTagName("input");
  //   expect(upload_image_input?.item(0)?.type).toBe("file");
  //   expect(upload_image_input?.item(0)?.accept).toBe("image/png, image/jpeg");
  // });

  // it('should contain create Ticket button', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const ticketButton = bannerElement.querySelector("#createTicket_button");
  //   expect(ticketButton).toBeTruthy();
  //   expect(ticketButton?.innerHTML).toBe("Create");
  // });
  
  // it('should contain discard Ticket button', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const ticketButton = bannerElement.querySelector("#discardTicket_button");
  //   expect(ticketButton).toBeTruthy();
  //   expect(ticketButton?.innerHTML).toBe("Discard");
    
  // });

  // it('Should contain default upload image preview component', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const preview = bannerElement.querySelector("#image_preview");
  //   expect(preview).toBeTruthy();

  // });


  // it('should contain issue type options', () => {
  //   const bannerElement : HTMLElement = fixture.nativeElement;
  //   const mat_select = bannerElement.querySelector("#issue_type_options");
  //   const mat_options = mat_select?.getElementsByTagName("mat-option");
  //   console.log(mat_select?.innerHTML);
  //   // console.log(mat_options);
    
  //   // expect(name_input_label?.length).toBe(4);
  //   expect(mat_options?.item(0)?.innerHTML).toBe("Pothole");
  //   expect(mat_options?.item(1)?.innerHTML).toBe("Electricity Outage");
  //   expect(mat_options?.item(2)?.innerHTML).toBe("Water Outage");
  //   expect(mat_options?.item(3)?.innerHTML).toBe("Sinkhole");
  // });


  
});
