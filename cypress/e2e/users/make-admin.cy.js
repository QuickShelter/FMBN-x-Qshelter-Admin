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
                url: `${API_BASE_URL}/onboarding/get-user*`,
            }, { fixture: 'subscriber-before-admin' }
        ).as('subscriberBeforeAdmin')

        cy.intercept(
            {
                method: 'POST',
                url: `${API_BASE_URL}/onboarding/make-admin`,
            }, { fixture: 'make-admin-response' }
        ).as('makeAdminResponse')
    });

    it("Should pass, fetch all", () => {
        // Auth
        cy.visit(getPath('/signin'));
        cy.get('input[name="identifier"]').type("admin@admin.com");
        cy.get('input[name="password"]').type("12345678");
        cy.get('button[data-test-id="submit"]').click();
        cy.wait("@login");

        cy.visit(getPath('/users/2'));
        cy.wait('@subscriberBeforeAdmin');

        cy.get('button').contains('Make Admin').click();
        cy.get('[data-test-id="role"]').select('Legal Admin');

        cy.intercept(
            {
                method: 'GET',
                url: `${API_BASE_URL}/onboarding/get-user*`, // that have a URL that matches '/users/*'
            }, { fixture: 'legal-admin' }
        ).as('legalAdmin')

        cy.get('[data-test-id="make-admin"]').click();


        cy.wait('@makeAdminResponse')

        cy.wait('@legalAdmin');
    });
});
