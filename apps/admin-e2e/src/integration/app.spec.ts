import { getGreeting } from '../support/app.po';

describe('admin', () => {
  // beforeEach(() => cy.visit('/'));

  // it('should display welcome message', () => {
  //   // Custom command example, see `../support/commands.ts` file
  //   cy.login('my-email@something.com', 'myPassword');

  //   // Function helper example, see `../support/app.po.ts` file
  //   getGreeting().contains('Welcome admin');
  // });
  it('should display welcome message', () => {
    cy.visit("/");
    cy.contains('Welcome to Gridwatch!');
    cy.contains('admin Application');
  });

  it('should route to tickets page', () => {
    cy.get("a.nav-link#Tickets").click();
    cy.contains('Date Created');
    cy.contains('Issue Type');
    cy.contains('Location');
    cy.contains('City');
    cy.contains('Status');
    cy.contains('Upvotes');
  });

  it('should filter acorrding to various types', () => {
    cy.get("a.nav-link#Tickets").click();
    cy.get("button.btn.btn-outline-dark").click();
    // cy.contains('Welcome to Gridwatch!');
    // cy.contains('admin Application');
  });

  it('should sort according to various types', () => {
    cy.get("a.nav-link#Tickets").click();
    cy.get('#sort_select').select("Original")
    // cy.contains('Welcome to Gridwatch!');
    // cy.contains('admin Application');
  });

  it('should show ticket details', () => {
    cy.visit("/adminViewTicketDetails");
    // cy.get("input[name=]")
    // cy.get("a.nav-link#Tickets").click();
    // cy.get('#sort_select').select("Original")
    cy.contains('Ticket ID');
    cy.contains('Ticket Status');
    cy.contains('Date created');
    cy.contains('Date closed');
    cy.contains('Ticket type');
    cy.contains('Ticket city');
    cy.contains('Ticket location');
    cy.contains('Ticket description');
    cy.contains('Ticket repair time');
    cy.contains('Ticket upvotes');
  });

  it('should dispatch ticket', () => {
    cy.visit("/adminViewTicket");
    cy.get("#row1").click();
    cy.get('#createTicket_button').click();
    cy.contains("Dispatched")
  });
  


  
  
});
