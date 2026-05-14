describe('Teste de ponta a ponta na Dashboard', () => {
  it('Verificar se o botão de "Nova transação" existe', () => {
    cy.visit('http://localhost:3000/dashboard')

    // Identificar o botão de "Nova transação" usando o ID
    cy.get('#new-transaction').should('exist')
  })

  it('Verificar se o modal de nova transação é aberto ao clicar no botão', () => {
    cy.visit('http://localhost:3000/dashboard')

    cy.get('#new-transaction').click()

    // Verificar se o modal de nova transação é exibido comparando o texto 'Cadastrar transação'

    cy.contains('Cadastrar transação').should('be.visible')
  })

  it('Não deve ser possível cadastrar uma transação sem preencher os campos obrigatórios', () => {
    cy.visit('http://localhost:3000/dashboard')

    cy.get('#new-transaction').click()

    // Clicar no botão de "Cadastrar" sem preencher os campos
    cy.get('#btn-register').click()

    // Verificar se as mensagens de erro na validação dos campos são exibidas
    cy.contains('Por favor, preencha todos os campos para cadastrar a transação').should('be.visible')
  })

  it('Deve ser possível cadastrar uma nova transação e exibir a mensagem de sucesso', () => {
    cy.visit('http://localhost:3000/dashboard')

    cy.get('#new-transaction').click()

    // Preencher os campos do formulário
    cy.get('#title').type('Salário')
    cy.get('#amount').type('5000')
    cy.get('#category').type('Renda')

    // Clicar no botão de "Cadastrar"
    cy.get('#btn-register').click()

    // Verificar se a mensagem de sucesso é exibida

    cy.contains('Transação cadastrada com sucesso!').should('be.visible')
  })
})