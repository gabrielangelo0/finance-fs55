describe('Testes de ponta a ponta na tela de Login', () => {
  it('Verificar se todos os campos estão preenchidos.', () => {
    cy.visit('http://localhost:3000/')

    // Preencher o campo de email e verificar se o valor foi inserido corretamente
    cy.get('#email').click().type('gabriel@email.com')

    // Preencher o campo de senha e verificar se o valor foi inserido corretamente
    cy.get('#senha').click().type('123456')

    // Clicar no botão de submit
    cy.get('#btn-submit').click()
  })

  it('Verificar se os campos de email e senha estão vazios.', () => {
    cy.visit('http://localhost:3000/')

    // Verificar se o campo de email está vazio
    cy.get('#email').should('have.value', '')

    // Verificar se o campo de senha está vazio
    cy.get('#senha').should('have.value', '')
  })

  it('Deve conseguir acessar a página de dashboard após o login', () => {
    cy.visit('http://localhost:3000/')

    // Preencher o campo de email e senha
    cy.get('#email').click().type('gabriel@test.com')
    cy.get('#senha').click().type('123456')

    // Clicar no botão de submit
    cy.get('#btn-submit').click()

    // Verificar se a URL mudou para a página de dashboard
    cy.url().should('include', '/dashboard')
  })

  // Forçar um erro de login para verificar se a aplicação lida corretamente com credenciais inválidas
  it('Deve exibir um alerta de erro ao tentar fazer login com credenciais inválidas', () => {
    cy.visit('http://localhost:3000/')

    // Preencher o campo de email e senha com credenciais inválidas
    cy.get('#email').click().type('gabriel@gmail.com')
    cy.get('#senha').click().type('senhaerrada')

    // Clicar no botão de submit
    cy.get('#btn-submit').click()

    // Verificar se o alerta de erro foi exibido
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Ocorreu um erro')
    })
  })
})