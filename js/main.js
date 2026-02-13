'use strict'

let teste = document.getElementById('conteudo-principal');
const botaoDs = document.getElementById("botao-ds");
const botaoRedes = document.getElementById("botao-redes");

botaoDs.addEventListener('click', (e)=> {
    teste.innerHTML = '<h1>DESENVOLVIMENTO DE SISTEMAS</h1>';
});

botaoRedes.addEventListener('click', (e)=> {
    teste.innerHTML = '<h1>REDES DE COMPUTADORES</h1>';
});