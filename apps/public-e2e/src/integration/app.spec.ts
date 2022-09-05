import { delay } from 'cypress/types/bluebird';
import { getGreeting } from '../support/app.po';

describe('public', () => {

//   it('should display create ticket page', () => {
//     cy.visit('/createTicket');
//     cy.contains('Issue Type');
//     cy.contains('Description');
//     cy.contains('Upload image of issue');
//     cy.contains('Pin location of issue');
//   });

//   it('should try to submit without filling in required fields', () => {
//     cy.get('#createTicket_button').click();
//     cy.contains('Complete all mandatory fields');
//     cy.contains('Close');
//     cy.get(
//       '[mat-dialog-actions=""] > .ng-star-inserted > .mat-focus-indicator > .mat-button-wrapper'
//     ).click();
//   });


//   it('should show location not found error', () => {
   
//     cy.get('#issue_field > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
//     cy.get('#mat-option-1 > .mat-option-text').click()
//     cy.get('#description').type('A huge pothole has formed on my street');
//     cy.get('#createTicket_button').click();
//   });

//   it('should create ticket', () => {
//     const options1 = {
//       delay: 3000,
//     };
//     const options = {
//       delay: 1000,
//     };
//     cy.get('[mat-dialog-actions=""] > .ng-star-inserted > .mat-focus-indicator > .mat-button-wrapper').click()
//     cy.get('#pac-input').type("56 B")
//     cy.get('#pac-input').click()
//     cy.get('#pac-input').type("{downArrow}", options);
//     cy.get('#pac-input').type("{downArrow}", options);
//     cy.get('#pac-input').type("{enter}", options1);
//     cy.get('#createTicket_button').click();
// });

//   it('should view all tickets available', () => {
//     cy.visit('/tickets');
//     cy.get('#mat-button-toggle-1-button > .mat-button-toggle-label-content').click();
    
//   });

//   it('should view ticket details', () => {
//     cy.get(':nth-child(1) > .mat-grid-list > :nth-child(1) > .citizenName > .mat-grid-tile-content').click();
//     // cy.contains("Kamano");
//     // cy.contains("Sinkhole");
//     // cy.contains("45 Chapel St");
//     // cy.contains("Dispatched");
//   });

//   it('should show login page', () => {
//     cy.visit("/profile");
//     cy.get('.optionsButton > .mat-focus-indicator').click();
//     cy.get('.mat-menu-content > :nth-child(2)').click();
//     cy.contains("Email");
//     cy.contains("Password");
//     cy.contains("Remember me?");
//     cy.contains("Submit");
//   });
//   it('should show register page', () => {
//     cy.get('.registerLink > a').click()
//     cy.contains("Username");
//     cy.contains("Email");
//     cy.contains("Password");
//     cy.contains("Confirm Password");
//     cy.contains("Register");
//   });

//   const user ="tshego" + (Math.floor(Math.random() * (100000000 - 0 + 1)) + 0) +"@gmail.com";

//   it('should register a new user', () => {
//     cy.visit("/register")
//     cy.get('.mat-form-field.ng-tns-c88-0 > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("Tshego")
//     cy.get('.mat-form-field.ng-tns-c88-1 > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type(user)
//     cy.get('.mat-form-field.ng-tns-c88-2 > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("123456")
//     cy.get('.mat-form-field.ng-tns-c88-3 > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("123456")
//     cy.get('.buttonContainer > :nth-child(1) > .mat-focus-indicator').click()
//   });


//   it('should login the user created', () => {
//     cy.visit("/")
//     cy.visit("/login")
//     cy.get('.mat-form-field.ng-tns-c88-0 > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type(user);
//     cy.get('.mat-form-field-hide-placeholder > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("123456")
//     cy.get('.button > .mat-focus-indicator').click();
//     cy.get('[routerlink="/createTicket"]').click();
//   });


//     it('should create ticket with new user', () => {
//       cy.get('[routerlink="/createTicket"]').click();
//     const options1 = {
//       delay: 3000,
//     };
//     const options = {
//       delay: 1000,
//     };

//     cy.get('#issue_field > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').click()
//     cy.get('#mat-option-2 > .mat-option-text').click()
//     cy.get('#description').type('A huge pothole has formed on my street');
    
//     cy.get('#pac-input').type("77 G")
//     cy.get('#pac-input').click()
//     cy.get('#pac-input').type("{downArrow}", options);
//     cy.get('#pac-input').type("{downArrow}", options);
//     cy.get('#pac-input').type("{downArrow}", options);
//     cy.get('#pac-input').type("{enter}", options1);
//     cy.get('#createTicket_button').click();
//     cy.get('.buttonsLogInContainer > :nth-child(2)').click()
//     cy.visit("/tickets");
// });
  









// //   it('should create new Ticket', () => {
// // });

//   //   it('should display ticket view with create ticket button', () => {
//   //     cy.visit("tickets");
//   //     cy.contains("Create ticket");
//   //   });

//   //   it('should display create ticket component', () => {
//   //     cy.get('#create_ticket > .btn').click()
//   //     cy.contains("Issue Type");
//   //     cy.contains("Description");
//   //     cy.contains("Upload image of issue");
//   //     cy.contains("Pin location of issue");
//   //     cy.contains("Use Current Location");
//   //     cy.contains("Create");
//   //     cy.contains("Discard");
//   //   });

//   //   it('should create a ticket', () => {
//   //     const options = {
//   //       delay : 10
//   //     }
//   //     cy.get("#issue_type_options").select("Pothole");
//   //     cy.get("#ticketDescription").type("A huge pothole has formed on my street");
//   //     // cy.get("input[type=file]").attachFile();
//   //     cy.get('#pac-input').type("125 Buitengracht Street")
//   //     cy.get('#pac-input').click();
//   //     cy.get('#pac-input').type("{downArrow}", options);
//   //     cy.get('#pac-input').type("{downArrow}",options);
//   //     cy.get('#pac-input').type("{enter}", options);
//   //     cy.get('#createTicket_button').click();
//   //   });

//   //   it('should show edit ticket component', () => {
//   //     cy.get(':nth-child(1) > .mat-card-footer > .row > .col-1 > .settings_icon_container > #dropdownMenuButton1').click();
//   //     cy.get(':nth-child(1) > .mat-card-footer > .row > .col-1 > .settings_icon_container > .dropdown-menu > :nth-child(1) > .dropdown-item').click()
//   //     cy.contains("Name");
//   //     cy.contains("Issue Type");
//   //     cy.contains("Description");
//   //     cy.contains("Upload image of issue");
//   //     cy.contains("Pin location of issue");
//   //     cy.get("google-map");

//   //   });

//   //   it('should edit the selected ticket ', () => {
//   //     cy.get("#issue_type_options").select("Sinkhole");
//   //     cy.get('#description_field > .form-control').type("It has developed to a sinkhole");
//   //     cy.get('#createTicket_button > .mat-button-wrapper').click();
//   //   });

//   //   it('should show login form ', () => {
//   //    cy.visit("login;app=public")
//   //   });

//   //   it('should show registration form ', () => {
//   //     cy.get('.mt-2 > a').click();
//   //   });

//   //   it('should upvotes tickets ', () => {
//   //     cy.visit("tickets")
//   //     for (let k = 0; k < 10; k++)
//   //     {
//   //       cy.get(':nth-child(1) > .mat-card-footer > .row > .col-10 > .upvote_img').click();
//   //     }
//   // });
});
