describe('Testes de ponta a ponta na tela de Login', () => {
  it('Verificar se todos os campos estão preenchidos.', () => {
    cy.visit('http://localhost:3000/')

    // Preencher o campo de email e verificar se o valor foi inserido corretamente
    cy.get('#email').click().type('gabriel@email.com')
  })
})