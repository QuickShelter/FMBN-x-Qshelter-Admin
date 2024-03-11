import { API_BASE_URL } from "../../environment";
import { getPath } from "../../helper";

describe("template spec", () => {
  before(() => {
    cy.intercept(
      {
        method: 'POST', // Route all GET requests
        url: `${API_BASE_URL}/onboarding/login`, // that have a URL that matches '/users/*'
      }, { fixture: 'login' }
    ).as('login') // and assign an alias


    cy.intercept(
      {
        method: 'GET',
        url: `${API_BASE_URL}/onboarding/get-user*`, // that have a URL that matches '/users/*'
      }, { fixture: 'user' }
    ).as('subscriber')
  });

  it("Should pass, fetch all", () => {
    // Auth
    cy.visit(getPath('/signin'));
    cy.get('input[name="identifier"]').type("admin@admin.com");
    cy.get('input[name="password"]').type("12345678");
    cy.get('button[data-test-id="submit"]').click();
    cy.wait("@login");

    cy.get('a').contains('Requests').click()
    cy.wait("@requests");
    cy.contains("Requests");

    cy.get('[data-test-id="request-card-link"]').first().click()
    cy.wait('@request');
    cy.contains("Mortgage");

    cy.get('[data-test-id="mortgage-decline-modal-button"]').first().click()
    cy.contains("affected document");
    cy.get('[data-test-id="mortgage-decline-cancel-button"]').first().click()
    cy.get('[data-test-id="mortgage-decline-modal-button"]').first().click()
    cy.contains("affected document");
    cy.get('[data-test-id="comment"]').type('The document is in a wrong format.');
  });
});
