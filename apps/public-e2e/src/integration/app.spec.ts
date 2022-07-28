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
//     const options = {
//       delay: 3000,
//     };
//     cy.get('[mat-dialog-actions=""] > .ng-star-inserted > .mat-focus-indicator > .mat-button-wrapper').click()
//     cy.get('#pac-input').type("56 B")
//     cy.get('#pac-input').click()
//     cy.get('#pac-input').type("{downArrow}", options);
//     cy.get('#pac-input').type("{downArrow}", options);
//     cy.get('#pac-input').type("{enter}", options);
//     cy.get('#createTicket_button').click();
// });

//   it('should create new Ticket', () => {
// });

  //   it('should display ticket view with create ticket button', () => {
  //     cy.visit("tickets");
  //     cy.contains("Create ticket");
  //   });

  //   it('should display create ticket component', () => {
  //     cy.get('#create_ticket > .btn').click()
  //     cy.contains("Issue Type");
  //     cy.contains("Description");
  //     cy.contains("Upload image of issue");
  //     cy.contains("Pin location of issue");
  //     cy.contains("Use Current Location");
  //     cy.contains("Create");
  //     cy.contains("Discard");
  //   });

  //   it('should create a ticket', () => {
  //     const options = {
  //       delay : 10
  //     }
  //     cy.get("#issue_type_options").select("Pothole");
  //     cy.get("#ticketDescription").type("A huge pothole has formed on my street");
  //     // cy.get("input[type=file]").attachFile();
  //     cy.get('#pac-input').type("125 Buitengracht Street")
  //     cy.get('#pac-input').click();
  //     cy.get('#pac-input').type("{downArrow}", options);
  //     cy.get('#pac-input').type("{downArrow}",options);
  //     cy.get('#pac-input').type("{enter}", options);
  //     cy.get('#createTicket_button').click();
  //   });

  //   it('should show edit ticket component', () => {
  //     cy.get(':nth-child(1) > .mat-card-footer > .row > .col-1 > .settings_icon_container > #dropdownMenuButton1').click();
  //     cy.get(':nth-child(1) > .mat-card-footer > .row > .col-1 > .settings_icon_container > .dropdown-menu > :nth-child(1) > .dropdown-item').click()
  //     cy.contains("Name");
  //     cy.contains("Issue Type");
  //     cy.contains("Description");
  //     cy.contains("Upload image of issue");
  //     cy.contains("Pin location of issue");
  //     cy.get("google-map");

  //   });

  //   it('should edit the selected ticket ', () => {
  //     cy.get("#issue_type_options").select("Sinkhole");
  //     cy.get('#description_field > .form-control').type("It has developed to a sinkhole");
  //     cy.get('#createTicket_button > .mat-button-wrapper').click();
  //   });

  //   it('should show login form ', () => {
  //    cy.visit("login;app=public")
  //   });

  //   it('should show registration form ', () => {
  //     cy.get('.mt-2 > a').click();
  //   });

  //   it('should upvotes tickets ', () => {
  //     cy.visit("tickets")
  //     for (let k = 0; k < 10; k++)
  //     {
  //       cy.get(':nth-child(1) > .mat-card-footer > .row > .col-10 > .upvote_img').click();
  //     }
  // });
});
