
describe('Login', () => {
  it('authenticates a user', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-test-id="signIn"]').contains('Sign In').click();

    const emailInput = cy.get('input[name=email');
    emailInput.type('Alex@Hamilton.com');

    const passwordInput = cy.get('input[name=password');
    passwordInput.type('Password1');

    cy.get('button').click();

    cy.get('[data-test-id="header"]').should('contain', 'Home');
  });
});

