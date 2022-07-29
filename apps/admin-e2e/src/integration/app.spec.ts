import { type } from 'os';
import { getGreeting } from '../support/app.po';

describe('admin', () => {
  // beforeEach(() => cy.visit('/'));

  // it('should display welcome message', () => {
  //   // Custom command example, see `../support/commands.ts` file
  //   cy.login('my-email@something.com', 'myPassword');

  //   // Function helper example, see `../support/app.po.ts` file
  //   getGreeting().contains('Welcome admin');
  // });
  // it('should display welcome message', () => {
  //   cy.visit("/");
  //   cy.contains('Welcome to Gridwatch!');
  //   cy.contains('admin Application');
  // });

  it('should route to tickets page', () => {
    cy.visit("/");
    cy.get('#mat-tab-label-0-1').click();
    cy.contains('Date');
    cy.contains('Issue');
    cy.contains('Location');
    cy.contains('City');
    cy.contains('Status');
    cy.contains('Upvotes');
  });

  it('should route to tickets view page', () => {
    cy.get('tbody > :nth-child(1) > .cdk-column-Location').click();
    cy.contains('ID');
    cy.contains('Date');
    cy.contains('Issue');
    cy.contains('Location');
    cy.contains('City');
    cy.contains('Status');
    cy.contains('Upvotes');
  });

  it('should dispatch a ticket to the tech team', () => {
    cy.get(':nth-child(1) > .mat-focus-indicator').click();
  });

  it('should filter tickets according to issues', () => {
    cy.get('.filterButton').click();
    cy.get('#cityFilter1 > .mat-checkbox-layout > .mat-checkbox-label').click();
    cy.get('.filterButton').click();
  });
  
  it('should reset filters', () => {
    cy.get('.filterButton').click();
    cy.get(':nth-child(7) > .mat-focus-indicator').click();
    cy.get('.filterButton').click();
    // cy.get('#mat-checkbox-26 > .mat-checkbox-layout').click();
  });
  
  it('should filter tickets according to status', () => {
    cy.get('.filterButton').click();
    cy.get('#statusFilter0 > .mat-checkbox-layout > .mat-checkbox-label').click();
    cy.get('.filterButton').click();
    // cy.get('#mat-checkbox-26 > .mat-checkbox-layout').click();
  });
  
  it('should reset filters', () => {
    cy.get('.filterButton').click();
    cy.get(':nth-child(7) > .mat-focus-indicator').click();
    cy.get('.filterButton').click();
    // cy.get('#mat-checkbox-26 > .mat-checkbox-layout').click();
  });

  it('should filter tickets according to city', () => {
    cy.get('.filterButton').click();
    cy.get('#cityFilter0 > .mat-checkbox-layout > .mat-checkbox-label').click();
    cy.get('.filterButton').click();
  });

  
  it('should reset filters', () => {
    cy.get('.filterButton').click();
    cy.get(':nth-child(7) > .mat-focus-indicator').click();
    cy.get('.filterButton').click();
    // cy.get('#mat-checkbox-26 > .mat-checkbox-layout').click();
  });

  it('should sort tickets according to date', () => {
    cy.get('.cdk-column-Date > .mat-sort-header-container > .mat-sort-header-arrow > .mat-sort-header-indicator > .mat-sort-header-pointer-right').click();
  });

  it('should sort tickets according to issue', () => {
    cy.get('.cdk-column-Issue > .mat-sort-header-container > .mat-sort-header-arrow').click();
  });

  it('should sort tickets according to city', () => {
    cy.get('.cdk-column-City > .mat-sort-header-container > .mat-sort-header-arrow').click()  
  });

  it('should sort tickets according to status', () => {
    cy.get('.cdk-column-Status > .mat-sort-header-container > .mat-sort-header-arrow').click()  
    
  });

  it('should show pothole graph', () => {
    cy.visit("/");
    cy.get('#mat-slide-toggle-1 > .mat-slide-toggle-label').click();
    cy.get('#mat-slide-toggle-1 > .mat-slide-toggle-label').click();
  });

  it('should show water graph', () => {
    cy.get('#mat-slide-toggle-2 > .mat-slide-toggle-label').click();
    cy.get('#mat-slide-toggle-2 > .mat-slide-toggle-label').click();
  });

  it('should show electricity graph', () => {
    cy.get('#mat-slide-toggle-3 > .mat-slide-toggle-label').click();
    cy.get('#mat-slide-toggle-3 > .mat-slide-toggle-label').click();
  });

  it('should show miscellaneous graph', () => {
    cy.get('#mat-slide-toggle-4 > .mat-slide-toggle-label').click();
    cy.get('#mat-slide-toggle-4 > .mat-slide-toggle-label').click();
  });

  it('should show all graphs', () => {
    cy.get('#mat-slide-toggle-1 > .mat-slide-toggle-label').click();
    cy.get('#mat-slide-toggle-2 > .mat-slide-toggle-label').click();
    cy.get('#mat-slide-toggle-3 > .mat-slide-toggle-label').click();
    cy.get('#mat-slide-toggle-4 > .mat-slide-toggle-label').click();
  });

  it('should register a admin', () => {
   cy.visit("/register");
   let number = "0";
   for (let i = 0; i < 9; i++) {
      number += Math.floor(Math.random() * (9 + 1));
   }
   const options = {
    delay: 1000,
  };
   
   cy.get(':nth-child(1) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("Mokgethwa Matlala");
   cy.get(':nth-child(2) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("Mokgethwa@gmail.com");
   cy.get(':nth-child(3) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type(number);
   cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("Pol");
   cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("{downarrow}", options);
   cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("{downarrow}", options);
   cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("{enter}", options);
   cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("Pre");
   cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("{downarrow}", options);
   cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("{downarrow}", options);
   cy.get(':nth-child(4) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("{enter}", options);
   cy.get(':nth-child(5) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("123456");
   cy.get(':nth-child(6) > .mat-form-field > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix').type("123456");
   cy.get('.mat-card-actions > .mat-focus-indicator').click();
   cy.visit("/adminTicketView")
  });

  



  

  // it('should sort according to various types', () => {
  //   cy.get("a.nav-link#Tickets").click();
  //   cy.get('#sort_select').select("Original")
  //   // cy.contains('Welcome to Gridwatch!');
  //   // cy.contains('admin Application');
  // });

  // it('should show ticket details', () => {
  //   cy.visit("/adminViewTicketDetails");
  //   // cy.get("input[name=]")
  //   // cy.get("a.nav-link#Tickets").click();
  //   // cy.get('#sort_select').select("Original")
  //   cy.contains('Ticket ID');
  //   cy.contains('Ticket Status');
  //   cy.contains('Date created');
  //   cy.contains('Date closed');
  //   cy.contains('Ticket type');
  //   cy.contains('Ticket city');
  //   cy.contains('Ticket location');
  //   cy.contains('Ticket description');
  //   cy.contains('Ticket repair time');
  //   cy.contains('Ticket upvotes');
  // });

  // it('should dispatch ticket', () => {
  //   cy.visit("/adminViewTicket");
  //   cy.get("#row1").click();
  //   cy.get('#createTicket_button').click();
  //   cy.contains("Dispatched")
  // });
  


  
  
});
