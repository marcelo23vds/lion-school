/************************************************************************
 * Objetivo: Arquivo responsavel pelo teste unitario (Unit Test) do arquivo
 *           de funções da aplicação web (main.js). Aqui iremos validar 
 *           todas as funções criadas no arquivo.
 * Data: 24/02/2026
 * Autor Test: Marcelo Vieira
 * Autor Dev: Marcelo Vieira
 * Versão: 1.0
 ***********************************************************************/

/**
 * @jest-environment jsdom
 */
// O comentário acima é OBRIGATÓRIO no front-end para o Jest entender o "document"

// ANTES de importar o arquivo main.js, precisamos "injetar" um HTML falso no JSDOM
// Isso garante que o document.getElementById encontre o que precisa e não quebre a leitura.
document.body.innerHTML = `
  <div id="conteudo-principal">
    <button id="botao-ds">DS</button>
    <button id="botao-redes">Redes</button>
  </div>
  <a href="#" class="botao-voltar"><span>Voltar</span></a>
  <h1 class="cabecalho-titulo">Logo</h1>
`;

// import do arquivo a ser realizado os testes unitarios
const appFrontEnd = require("../js/main.js");

// CENARIO DE TESTE 01: Teste de regra de negócio na interface (limite de 100%)
test("Validação da altura da barra para notas que ultrapassam 100:", function(){

    // dado falso (Mock)
    // Em testes de software um Mock é uma versão falsa de uma função, 
    // criada especificamente para o ambiente de testes.
    const dadosMateria = { categoria: "Matemática", valor: 150 };
    // rodando a função
    const elementoCriado = appFrontEnd.criarBarraGrafico(dadosMateria);
    // div interna que recebe a altura
    const divFill = elementoCriado.querySelector('.barra-fill');

    // regra do IF
    expect(divFill.style.height).toBe("100%");
    // Valida se criou o elemento certo
    expect(elementoCriado.tagName).toBe("DIV");

});

// CENARIO DE TESTE 02: Teste de criação de card de aluno
test("Validação da criação do card com os dados do aluno:", function(){

    // dado falso (Mock)
    const alunoMock = { nome: "João Silva", foto: "joao.png" };
    
    const card = appFrontEnd.criarCard(alunoMock);
    
    const titulo = card.querySelector('.card-title');
    const imagem = card.querySelector('.card-img');
    
    expect(titulo.textContent).toBe("João Silva");
    expect(imagem.src).toContain("joao.png");

});