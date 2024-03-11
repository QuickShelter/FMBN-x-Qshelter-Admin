
import { getPath } from "../helper";

describe("template spec", () => {
  it("Should fail, and show error message, when an unregistered email, or wrong password is used", () => {
    cy.intercept("https://cherry.qshelter.ng/onboarding/login").as(
      "signInRequest"
    );

    cy.visit(getPath('/signin'));
    cy.get('input[name="identifier"]').type("fatokunfemi03@gmail.com");
    cy.get('input[name="password"]').type("!234Qwer");
    cy.get('button[data-test-id="submit"]').click();
    cy.wait("@signInRequest");
    cy.contains("Invalid");
  });

  it("Should pass, and navigate to the dashboard, when a registered credentials are provided", () => {
    cy.intercept("https://cherry.qshelter.ng/onboarding/login").as(
      "signInRequest"
    );

    cy.visit(getPath('/signin'));
    cy.get('input[name="identifier"]').type("admin@admin.com");
    cy.get('input[name="password"]').type("12345678");
    cy.get('button[data-test-id="submit"]').click();
    cy.wait("@signInRequest");
    cy.url().should("include", "/dashboard");
  });
});
