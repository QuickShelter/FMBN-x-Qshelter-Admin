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
        url: `${API_BASE_URL}/propy/get-property*`, // that have a URL that matches '/users/*'
      }, { fixture: 'property' }
    ).as('property')
  });

  it("Should pass, fetch all", () => {
    // Auth
    cy.visit(getPath('/signin'));
    cy.get('input[name="identifier"]').type("admin@admin.com");
    cy.get('input[name="password"]').type("12345678");
    cy.get('button[data-test-id="submit"]').click();
    cy.wait("@login");

    cy.get('a').contains('Properties').click()
    cy.wait("@properties");
    cy.contains("Properties");

    cy.get('[data-test-id="property-card-link"]').first().click()
    cy.wait('@property');
    cy.contains("Edit");

    cy.get('button').contains('Buildings').click()
    cy.contains("Locked");

    cy.get('[data-test-id="building-card-link"]').first().click()
    cy.contains("All")
    cy.contains("Available")
    cy.get('[data-test-id="unit-card-link"]').first().click()
    cy.get('[data-test-id="unit-change-status-modal-trigger"]').click()
    cy.get("dialog").contains("Change Status")
    cy.get("button").contains("Change Status").should('be.disabled')
    cy.get("select").select(1)
    cy.get("button").contains("Change Status").should('not.be.disabled')
  });
});
