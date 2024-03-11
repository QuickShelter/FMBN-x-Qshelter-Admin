// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { API_BASE_URL } from "../environment";

beforeEach(() => {
    // cy.intercept(
    //     {
    //         method: 'POST', // Route all GET requests
    //         url: `${API_BASE_URL}/onboarding/login`, // that have a URL that matches '/users/*'
    //     }, { fixture: 'login' }
    // ).as('login') // and assign an alias

    cy.intercept(
        {
            method: 'GET',
            url: `${API_BASE_URL}/propy/filter-properties*`, // that have a URL that matches '/users/*'
        }, { fixture: 'properties' }
    ).as('properties')

    cy.intercept(
        {
            method: 'GET', // Route all GET requests
            url: `${API_BASE_URL}/request/list-requests*`,
        }, { fixture: 'requests' }
    ).as('requests')

    cy.intercept(
        {
            method: 'GET', // Route all GET requests
            url: `${API_BASE_URL}/request/get-request-by-unit-id`,
        }, { fixture: 'request-by-unit-id' }
    ).as('requestByUnitId')

    cy.intercept(
        {
            method: 'GET', // Route all GET requests
            url: `${API_BASE_URL}/onboarding/dashboard-data`,
        }, { fixture: 'dashboard-data' }
    ).as('dashboardData')

    cy.intercept(
        {
            method: 'GET',
            url: `${API_BASE_URL}/mortgage/api/mortgage-activities/*`,
        }, { fixture: 'mortgage-activities' }
    ).as('mortgageActivities')

})