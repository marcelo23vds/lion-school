'use strict'

const BASE_URL = 'https://lion-school-backend.onrender.com'
const mainContainer = document.getElementById('conteudo-principal')
const home = mainContainer.innerHTML

const getAlunos = async (cursoId) => {
    const url = `${BASE_URL}/alunos?curso_id=${cursoId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const criarCard = (aluno) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = aluno.foto;
    img.alt = 'Foto'
    img.classList.add('card-img')

    const nome = document.createElement('span')
    nome.textContent = aluno.nome;
    nome.classList.add('card-title')

    card.append(img, nome)

    card.addEventListener('click', () => {
        carregarDetalhes(aluno)
    })

    return card
}

const criarBarraGrafico = (dadosMateria) => {
    
    const divGrupo = document.createElement('div')
    divGrupo.classList.add('barra-grupo')

    const spanValor = document.createElement('span')
    spanValor.textContent = dadosMateria.valor
    spanValor.classList.add('nota-valor')

    // Estrutura da barra (Track + Fill)
    const divTrack = document.createElement('div')
    divTrack.classList.add('barra-track')

    const divFill = document.createElement('div')
    divFill.classList.add('barra-fill')
    
    // Define a altura (Ex: 85%)
    let altura = dadosMateria.valor;
    if(altura > 100) altura = 100;
    divFill.style.height = `${altura}%`

    divFill.classList.add('bg')

    divTrack.appendChild(divFill)

    //sigla materia
    const spanSigla = document.createElement('span')
    spanSigla.textContent = dadosMateria.categoria
    spanSigla.classList.add('sigla-materia')

    divGrupo.append(spanValor, divTrack, spanSigla)

    return divGrupo
}

// telas

const carregarHome = () => {
    mainContainer.innerHTML = home
    configurarBotoesHome()
    atualizarBotaoVoltar('Sair', '#')
}

const carregarListaAlunos = async (cursoId) => {
    
    const listaAlunos = await getAlunos(cursoId)
    
    mainContainer.innerHTML = ''
    
    //organizar titulo em cima e Cards embaixo
    const telaLista = document.createElement('div')
    telaLista.classList.add('tela-lista-alunos')

    const titulo = document.createElement('h2')
    titulo.classList.add('titulo-curso')
    
    if (cursoId === 1) titulo.textContent = 'Desenvolvimento de Sistemas'
    else if (cursoId === 2) titulo.textContent = 'Redes de Computadores'
    else titulo.textContent = 'Lista de Alunos'

    const containerCards = document.createElement('div')
    containerCards.classList.add('container-cards')

    listaAlunos.forEach(aluno => {
        aluno.cursoIdOrigem = cursoId
        containerCards.appendChild(criarCard(aluno))
    })

    //montar a tela
    telaLista.appendChild(titulo)
    telaLista.appendChild(containerCards)
    mainContainer.appendChild(telaLista)

    atualizarBotaoVoltar('Voltar', carregarHome)
}

const carregarDetalhes = (aluno) => {

    mainContainer.innerHTML = ''
    
    const container = document.createElement('div')
    container.classList.add('container-detalhes')

    const info = document.createElement('div')
    info.classList.add('detalhes-aluno')
    const img = document.createElement('img')
    img.src = aluno.foto
    const nome = document.createElement('h2')
    nome.textContent = aluno.nome
    info.append(img, nome)

    const graficoDiv = document.createElement('div')
    graficoDiv.classList.add('detalhes-grafico')

    const containerBarras = document.createElement('div')
    containerBarras.classList.add('grafico-container')

    const notas = aluno.desempenho || [];

    notas.forEach(materia => {
        containerBarras.appendChild(criarBarraGrafico(materia))
    })

    graficoDiv.appendChild(containerBarras)
    container.append(info, graficoDiv)
    mainContainer.appendChild(container)

    atualizarBotaoVoltar('Voltar', () => {
        if (aluno.cursoIdOrigem) carregarListaAlunos(aluno.cursoIdOrigem)
        else carregarHome()
    })
}

// funcoes de apoio

const atualizarBotaoVoltar = (texto, acao) => {
    const link = document.querySelector('.botao-voltar')
    if(!link) return
    
    link.querySelector('span').textContent = texto
    const novoLink = link.cloneNode(true)
    link.parentNode.replaceChild(novoLink, link)

    if (typeof acao === 'function') {
        novoLink.addEventListener('click', (e) => { e.preventDefault(); acao(); })
    } else {
        novoLink.href = acao
        novoLink.addEventListener('click', () => { if(texto === 'Sair') window.location.reload(); })
    }
}

const configurarBotoesHome = () => {
    const btnDS = document.getElementById('botao-ds')
    const btnRedes = document.getElementById('botao-redes')
    if (btnDS) btnDS.addEventListener('click', () => carregarListaAlunos(1))
    if (btnRedes) btnRedes.addEventListener('click', () => carregarListaAlunos(2))
}

//funcao para clicar na logo e voltar para home
const configurarLogo = () => {
    const logo = document.querySelector('.cabecalho-titulo')
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault() // Evita que o link recarregue a página
            carregarHome() // Chama a função que restaura a home
        });
        logo.style.cursor = 'pointer'
    }
}

//iniciar

configurarLogo()
configurarBotoesHome()

module.exports = {
    getAlunos,
    criarCard,
    criarBarraGrafico
}