describe('Agenda de Contatos - Testes E2E', () => {
  const contatoTeste = {
    nome: 'João Silva Teste',
    email: 'joao.teste@email.com',
    telefone: '11999887766',
  }

  const contatoEditado = {
    nome: 'João Silva Editado',
    email: 'joao.editado@email.com',
    telefone: '11988776655',
  }

  beforeEach(() => {
    cy.visit('/')
  })

  // ─────────────────────────────────────────────
  // INCLUSÃO DE CONTATO
  // ─────────────────────────────────────────────
  describe('Inclusão de contato', () => {
    it('deve exibir o formulário de adição na página inicial', () => {
      cy.get('input[placeholder="Nome"]').should('be.visible')
      cy.get('input[placeholder="E-mail"]').should('be.visible')
      cy.get('input[placeholder="Telefone"]').should('be.visible')
      cy.get('button.adicionar').should('be.visible').and('contain', 'Adicionar')
    })

    it('deve adicionar um novo contato com sucesso', () => {
      cy.get('input[placeholder="Nome"]').type(contatoTeste.nome)
      cy.get('input[placeholder="E-mail"]').type(contatoTeste.email)
      cy.get('input[placeholder="Telefone"]').type(contatoTeste.telefone)

      cy.get('button.adicionar').click()

      // O contato recém‑adicionado deve aparecer na lista
      cy.contains(contatoTeste.nome).should('be.visible')
      cy.contains(contatoTeste.email).should('be.visible')
      cy.contains(contatoTeste.telefone).should('be.visible')
    })

    it('deve limpar os campos do formulário após adicionar', () => {
      cy.get('input[placeholder="Nome"]').type(contatoTeste.nome)
      cy.get('input[placeholder="E-mail"]').type(contatoTeste.email)
      cy.get('input[placeholder="Telefone"]').type(contatoTeste.telefone)

      cy.get('button.adicionar').click()

      cy.get('input[placeholder="Nome"]').should('have.value', '')
      cy.get('input[placeholder="E-mail"]').should('have.value', '')
      cy.get('input[placeholder="Telefone"]').should('have.value', '')
    })

    it('deve incrementar o contador de contatos ao adicionar', () => {
      cy.get('h2').then(($h2) => {
        const textoAtual = $h2.text()
        const qtdAtual = parseInt(textoAtual.match(/\d+/)?.[0] ?? '0', 10)

        cy.get('input[placeholder="Nome"]').type(contatoTeste.nome)
        cy.get('input[placeholder="E-mail"]').type(contatoTeste.email)
        cy.get('input[placeholder="Telefone"]').type(contatoTeste.telefone)
        cy.get('button.adicionar').click()

        cy.get('h2').should('contain', qtdAtual + 1)
      })
    })
  })

  // ─────────────────────────────────────────────
  // ALTERAÇÃO DE CONTATO
  // ─────────────────────────────────────────────
  describe('Alteração de contato', () => {
    beforeEach(() => {
      // Garante a existência de pelo menos um contato antes de editar
      cy.get('input[placeholder="Nome"]').type(contatoTeste.nome)
      cy.get('input[placeholder="E-mail"]').type(contatoTeste.email)
      cy.get('input[placeholder="Telefone"]').type(contatoTeste.telefone)
      cy.get('button.adicionar').click()
      cy.contains(contatoTeste.nome).should('be.visible')
    })

    it('deve exibir o formulário de edição ao clicar em Editar', () => {
      cy.contains(contatoTeste.nome)
        .closest('.contato')
        .find('button.edit')
        .click()

      cy.get('button.alterar').should('be.visible').and('contain', 'Salvar')
      cy.get('button.cancelar').should('be.visible').and('contain', 'Cancelar')
      cy.get('input[placeholder="Nome"]').should('have.value', contatoTeste.nome)
    })

    it('deve preencher o formulário com os dados do contato selecionado', () => {
      cy.contains(contatoTeste.nome)
        .closest('.contato')
        .find('button.edit')
        .click()

      cy.get('input[placeholder="Nome"]').should('have.value', contatoTeste.nome)
      cy.get('input[placeholder="E-mail"]').should('have.value', contatoTeste.email)
      cy.get('input[placeholder="Telefone"]').should('have.value', contatoTeste.telefone)
    })

    it('deve salvar as alterações do contato com sucesso', () => {
      cy.contains(contatoTeste.nome)
        .closest('.contato')
        .find('button.edit')
        .click()

      cy.get('input[placeholder="Nome"]').clear().type(contatoEditado.nome)
      cy.get('input[placeholder="E-mail"]').clear().type(contatoEditado.email)
      cy.get('input[placeholder="Telefone"]').clear().type(contatoEditado.telefone)

      cy.get('button.alterar').click()

      cy.contains(contatoEditado.nome).should('be.visible')
      cy.contains(contatoEditado.email).should('be.visible')
      cy.contains(contatoEditado.telefone).should('be.visible')
    })

    it('deve cancelar a edição e manter os dados originais', () => {
      cy.contains(contatoTeste.nome)
        .closest('.contato')
        .find('button.edit')
        .click()

      cy.get('input[placeholder="Nome"]').clear().type('Nome Que Nao Deve Ser Salvo')
      cy.get('button.cancelar').click()

      // O botão "Adicionar" deve estar visível novamente (modo não-edição)
      cy.get('button.adicionar').should('be.visible')
      // O dado original deve permanecer
      cy.contains(contatoTeste.nome).should('be.visible')
    })
  })

  // ─────────────────────────────────────────────
  // REMOÇÃO DE CONTATO
  // ─────────────────────────────────────────────
  describe('Remoção de contato', () => {
    beforeEach(() => {
      // Garante a existência de pelo menos um contato antes de remover
      cy.get('input[placeholder="Nome"]').type(contatoTeste.nome)
      cy.get('input[placeholder="E-mail"]').type(contatoTeste.email)
      cy.get('input[placeholder="Telefone"]').type(contatoTeste.telefone)
      cy.get('button.adicionar').click()
      cy.contains(contatoTeste.nome).should('be.visible')
    })

    it('deve remover o contato ao clicar em Deletar', () => {
      cy.contains(contatoTeste.nome)
        .closest('.contato')
        .find('button.delete')
        .click()

      cy.contains(contatoTeste.nome).should('not.exist')
    })

    it('deve decrementar o contador de contatos após remoção', () => {
      cy.get('h2').then(($h2) => {
        const textoAtual = $h2.text()
        const qtdAtual = parseInt(textoAtual.match(/\d+/)?.[0] ?? '0', 10)

        cy.contains(contatoTeste.nome)
          .closest('.contato')
          .find('button.delete')
          .click()

        cy.get('h2').should('contain', qtdAtual - 1)
      })
    })
  })
})
