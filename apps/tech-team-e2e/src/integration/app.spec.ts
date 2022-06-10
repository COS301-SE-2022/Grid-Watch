import { getGreeting } from "../support/app.po";


  describe("Testing API Endpoints Using Cypress", () => {

    it("Test GET Request", () => {
          cy.request("http://localhost:3333/api/techteam/1")
               .then((response: { body: any; }) => {
                      expect(response.body).to.have.property("code", 200);
          })
    })

    it("Test POST Request", () => {
          cy.request({
               method: "POST",
               url: "http://localhost:3333/api/techteam/create",
               body: {
                    name :                  "Frikkie",
                    email :                 "Frikkie@gmail.com",
                    specialisation :        "Potholes",
                    contact_number :        "0219983245",
                    password :              "1234",
               }
          }).then((response: { body: any; }) => { 
                  expect(response.body).has.property("title","Automation"); 
          })
    })

    it("Test PUT Request", () => {
          cy.request({
                  method: "PUT",
                  url: "http://localhost:3333/api/techteam/1",
                  body: { 
                     "id": 2,
                     "title" : "Test Automation"
                  }
          }).then((response: { body: any; }) => { 
                  expect(response.body).has.property("title"," Test Automation"); 
          })          
    })        

    it("Test DELETE Request", () => {
          cy.request({
                    method : "DELETE",
                    url: "http://localhost:3333/api/techteam/1"
                    }).then((response: { body: any; }) => {
                      expect(response.body).to.be.empty;
          })	
    })
 
});
