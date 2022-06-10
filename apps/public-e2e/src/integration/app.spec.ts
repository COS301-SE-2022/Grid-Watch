import { getGreeting } from '../support/app.po';

describe('public', () => {
  beforeEach(() => cy.visit('/'));

  // it('should display welcome message', () => {
  //   // Custom command example, see `../support/commands.ts` file
  //   cy.login('my-email@something.com', 'myPassword');

  //   // Function helper example, see `../support/app.po.ts` file
  //   getGreeting().contains('Welcome public');
  // });
});

///////////////////////////////////////////////
///////////// Integration Testing /////////////
///////////////////////////////////////////////

describe('Ticket controller Integration Testing',()=>{
  
  it('Test getTicket request',()=>{
    cy.request("http://localhost:3333/api/ticket/1")
      .then((response)=>{
        expect(response.body).to.have.property("ticketId",1);
      })
  })

  it('Test incUpvotes',()=>{
    cy.request("http://localhost:3333/api/ticket/inc/1")
      .then((response)=>{
        expect(response.body).to.have.property("upvotes",2);
      })
  })

  it('Test getCity',()=>{
    cy.request("http://localhost:3333/api/ticket/city/Pretoria")
      .then((response)=>{
        expect(response.body).to.have.property("city","Pretoria");
      })
  })

  it('Test getStatus',()=>{
    cy.request("http://localhost:3333/api/ticket/status/dispached")
      .then((response)=>{
        expect(response.body).to.have.property("status","dispached");
      })
  })

  it('Test issue',()=>{
    cy.request("http://localhost:3333/api/ticket/issue/potholes")
      .then((response)=>{
        expect(response.body).to.have.property("issue","potholes");
      })
  })

})
