// cypress/e2e/bookmarks.cy.ts

describe('Bookmarks Page', () => {
  it('should log in and load bookmarked jobs', () => {
    cy.visit('/SignIn?callbackUrl=%2F');

    cy.get('input#email').type('ebenezerseleshi@gmail.com');
    cy.get('input#password').type('12345678');
    cy.get('button[type="submit"]').click();

    // Wait for redirect to /
    cy.url({ timeout: 10000 }).should('include', '/');

    // Navigate to /bookmarks
    cy.visit('/bookmarks');

    // Ensure heading is visible
    cy.contains('Bookmarks', { timeout: 10000 }).should('exist');

    // Wait until the loader disappears
    cy.get('.loader', { timeout: 10000 }).should('not.exist');
  });
});
