describe('Abrir nosso coiso de descrever coisas.', () => {

    it('Deve cadastrar as coisas tudo', () => {

        // Visita o site
        cy.visit('http://localhost:5173/')

        // Preencher o formulário de cadastro de EPI
        cy.get('[id=nomeEPI]').type('Capacete de Segurança');
        cy.get('[id=dataValidade]').type('12/12/1999');
        cy.get('[id=numeroCA]').type('1234');
        cy.get('[id=status]').select('Manutenção');

        // Cadastrar as info do EPI
        cy.get('[id=botaoCasEPI]').click();

        // Botão de ir para próxima página
        cy.get('[id=botaoProxFun]').click();

        // Preencer o formulario de cadastro de Funcionarios
        cy.get('[id=nomeFun]').type('Faustão');
        cy.get('[id=cpf]').type('000.000.122.22');
        cy.get('[id=cargo]').type('Apresentador');

        // Cadastar as info do Funcionarios
        cy.get('[id=cadastrarFun]').click();

        // Ir para as info do Funcionarios e EPIs
        cy.get('[id=irParaInfo]').click();

        // Iremos agora registrar os cadastros de Retirada ou Devolução
        cy.get('[id=RegistrarRetOuDev]').first().click();

        //Cadastrar as info de retirada ou devolução
        cy.get('[id=idFun]').type('52');
        cy.get('[id=data]').type('04/12/2024');
        cy.get('[id=Tipo]').select('Devolução');

        // Apertar o botão para registrar o botão
        cy.get('[id=RegistrarHistórico]').click();

        // Limpar o histórico.
        cy.get('[id=limpar]').click();

        // Voltar pra parte de infos.
        cy.get('[id=irParaInfo]').click();

        // Ir na parte de editar o Funcionario.
        cy.get('[id=editFunnn]').first().click();

        // Atualizar as coisas.
        cy.get('[id=nome]').type('Fausto Silva');
        cy.get('[id=cpf]').type('117.255.079.43');
        cy.get('[id=setor]').type('Ataque do Coração');

        // Registrar as coisas novas.
        cy.get('[id=atualizar]').click();

        // Como ele ja vai para as infos, agora vamos editar os Epi´s
        cy.get('[id=EditarEpi]').first().click();

        //FDS
        cy.get('[id=nome]').type('armadura');
        cy.get('[id=dataValidade]').type('01/01/1822');
        cy.get('[id=numeroCA]').type('9999');
        cy.get('[id=status]').select('Expirado');

        //avança o ffds
        cy.get('[id=salvar]').click();

        // apagar o fun
        cy.get('[id=RemoverFun]').first().click();

        // agora apaga epi
        cy.get('[id=RemoverEPI]').first().click();


    })
})