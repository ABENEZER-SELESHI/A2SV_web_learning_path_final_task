describe('Home Page with Bookmarks', () => {
  it('should log in, load bookmarked jobs, and toggle a bookmark', () => {
    // Step 1: Visit login page with redirect back to home
    cy.visit('/SignIn?callbackUrl=%2F');

    // Step 2: Login
    cy.get('input#email').type('ebenezerseleshi@gmail.com');
    cy.get('input#password').type('12345678');
    cy.get('button[type="submit"]').contains(/login/i).click();

    // Step 3: Wait for redirect to home
    cy.url({ timeout: 10000 }).should('eq', 'http://localhost:3000/');

    // Step 4: Check for bookmarks content directly on the homepage
    cy.contains('Bookmarks', { timeout: 10000 }).should('exist');
    cy.contains(/showing \d+ results/i, { timeout: 10000 }).should('exist');

    // Step 5: Check bookmark buttons
    cy.get('[data-cy^="bookmark-btn-"]', { timeout: 10000 }).should('exist');
    cy.get('[data-cy^="bookmark-btn-"]').first().as('firstBookmarkBtn');

    // Step 6: Toggle bookmark
    cy.get('@firstBookmarkBtn').click();
    cy.get('@firstBookmarkBtn').should('contain.text', 'Bookmark');

    cy.get('@firstBookmarkBtn').click();
    cy.get('@firstBookmarkBtn').should('contain.text', 'Bookmarked');
  });
});
