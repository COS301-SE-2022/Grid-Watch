import { delay } from 'cypress/types/bluebird';
import { getGreeting } from '../support/app.po';

describe('public', () => {
  // beforeEach(() => cy.visit('/'));

  // it('should display welcome message', () => {
  //   // Custom command example, see `../support/commands.ts` file
  //   // cy.login('my-email@something.com', 'myPassword');

  //   // Function helper example, see `../support/app.po.ts` file
  //   cy.visit("/")
  //   cy.contains('Welcome to Gridwatch');
  //   cy.contains('public Application');
  // });

//   it('should display google maps element', () => {
//     cy.get("google-map");
//     cy.get("map-marker");
//   });

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
