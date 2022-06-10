import { getGreeting } from '../support/app.po';

describe('tech-team', () => {
  // beforeEach(() => cy.visit('/'));

  
  it('should display welcome message', () => {
    cy.visit("/");
    cy.contains('Welcome to Gridwatch');
    cy.contains('tech-team Application');
  });

  it('should contain google maps component', () => {
    cy.get("google-map");
    cy.get("map-marker");
  });
  
  it('should show available tickets component', () => {
    cy.visit("tickets");
    cy.contains("Date Created");
    cy.contains("Issue Type");
    cy.contains("Location");
    cy.contains("city");
    cy.contains("status");
  });
  it('should tickets details component', () => {
    cy.get("#option1").click()
    cy.contains("Description");
    cy.contains("Create date");
    cy.contains("Address");
    cy.contains("City");
  });
  it('should accept ticket for tech team', () => {
    cy.get(':nth-child(1) > .btn').click();
  });

  it('should edit ticket details prior to accepting', () => {
    cy.get('#repair_time').type("50");
    cy.get('#ticketStatus').select("Accepted");
    cy.get('#cost').type("3500");
  });

  it('should accept ticket ', () => {
    cy.get('#update_button').click();
    cy.visit("acceptedTickets")
  });
  
  it('should change ticket status', () => {
    cy.get('#option0').click();
    cy.get("#ticketStatus").select("In Progress");
    cy.get('#update_button').click();
    cy.visit("acceptedTickets")
  });
  
});
