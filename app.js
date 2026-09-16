// ==========================================
// JOGO DE ADIVINHAÇÃO v1.0
// ==========================================


// ==========================================
// DADOS DO JOGADOR
// ==========================================

let jogador = {
    nome: "",
    idade: 0,
    historico: []
};


// ==========================================
// VARIÁVEIS DA PARTIDA
// ==========================================

let numeroSecreto = 0;
let tentativas = 0;
let jogoAtivo = false;


// ==========================================
// ELEMENTOS DA TELA DE IDENTIFICAÇÃO
// ==========================================

let telaIdentificacao = document.querySelector('#telaIdentificacao');

let campoNome = document.querySelector('#nome');

let campoIdade = document.querySelector('#idade');

let btnEntrar = document.querySelector('#btnEntrar');


// ==========================================
// ELEMENTOS DA TELA INICIAL
// ==========================================

let telaInicio = document.querySelector('#telaInicio');

let nomeJogador = document.querySelector('#nomeJogador');

let btnIniciarJogo = document.querySelector('#btnIniciarJogo');

let btnSairJogo = document.querySelector('#btnSairJogo');


// ==========================================
// ELEMENTOS DA TELA DO JOGO
// ==========================================

let telaJogo = document.querySelector('#telaJogo');

let campoPalpite = document.querySelector('#palpite');

let campoAdivinhar = document.querySelector('#btnAdivinhar');

let campoMensagem = document.querySelector('#mensagem');

let campoTentativas = document.querySelector('#tentativas');


// ==========================================
// ELEMENTOS DO MODAL
// ==========================================

let modalVitoria = document.querySelector('#modalVitoria');

let modalTentativas = document.querySelector('#modalTentativas');

let btnJogarNovamente = document.querySelector('#btnJogarNovamente');

let btnFecharModal = document.querySelector('#btnFecharModal');


// ==========================================
// INICIALIZAÇÃO
// ==========================================

carregarJogador();


// ==========================================
// BOTÃO ENTRAR
// ==========================================

btnEntrar.addEventListener('click', function () {

    let nome = campoNome.value.trim();

    let idade = parseInt(campoIdade.value);


    if (nome === "") {

        alert("Digite seu nome.");

        campoNome.focus();

        return;
    }


    if (isNaN(idade) || idade <= 0 || idade > 120) {

        alert("Digite uma idade válida.");

        campoIdade.focus();

        return;
    }


    jogador.nome = nome;

    jogador.idade = idade;

    jogador.historico = [];


    salvarJogador();

    mostrarTelaInicio();

});


// ==========================================
// BOTÃO INICIAR JOGO
// ==========================================

btnIniciarJogo.addEventListener('click', function () {

    iniciarPartida();

});


// ==========================================
// BOTÃO ADIVINHAR
// ==========================================

campoAdivinhar.addEventListener('click', function () {

    if (!jogoAtivo) {
        return;
    }


    let palpite = parseInt(campoPalpite.value);


    if (isNaN(palpite)) {

        campoMensagem.textContent = "Digite um número.";

        campoPalpite.focus();

        return;
    }


    if (palpite < 1 || palpite > 10) {

        campoMensagem.textContent =
            "Digite um número entre 1 e 10.";

        campoPalpite.focus();

        return;
    }


    tentativas++;

    campoTentativas.textContent = tentativas;


    if (palpite > numeroSecreto) {

        campoMensagem.textContent =
            "O número secreto é menor. Tente novamente.";


    } else if (palpite < numeroSecreto) {

        campoMensagem.textContent =
            "O número secreto é maior. Tente novamente.";


    } else {

        finalizarPartida();

    }

});


// ==========================================
// BOTÃO JOGAR NOVAMENTE
// ==========================================

btnJogarNovamente.addEventListener('click', function () {

    modalVitoria.style.display = "none";

    iniciarPartida();

});


// ==========================================
// BOTÃO FECHAR MODAL
// ==========================================

btnFecharModal.addEventListener('click', function () {

    modalVitoria.style.display = "none";

    telaJogo.style.display = "none";

    telaInicio.style.display = "block";

});


// ==========================================
// BOTÃO SAIR DO JOGO
// ==========================================

btnSairJogo.addEventListener('click', function () {

    sairDoJogo();

});


// ==========================================
// FUNÇÃO INICIAR PARTIDA
// ==========================================

function iniciarPartida() {

    numeroSecreto = Math.floor(Math.random() * 10) + 1;

    tentativas = 0;

    jogoAtivo = true;

    campoPalpite.value = "";

    campoTentativas.textContent = "0";

    campoMensagem.textContent = "Boa sorte!";


    telaIdentificacao.style.display = "none";

    telaInicio.style.display = "none";

    telaJogo.style.display = "block";


    campoPalpite.focus();


    console.log("Número secreto:", numeroSecreto);

}


// ==========================================
// FUNÇÃO FINALIZAR PARTIDA
// ==========================================

function finalizarPartida() {

    jogoAtivo = false;

    campoMensagem.textContent =
        "Parabéns! Você acertou!";

    modalTentativas.textContent = tentativas;


    jogador.historico.push({

        tentativas: tentativas,

        resultado: "Acertou"

    });


    salvarJogador();


    modalVitoria.style.display = "flex";

}


// ==========================================
// FUNÇÃO MOSTRAR TELA INICIAL
// ==========================================

function mostrarTelaInicio() {

    telaIdentificacao.style.display = "none";

    telaJogo.style.display = "none";

    telaInicio.style.display = "block";

    nomeJogador.textContent = jogador.nome;

}


// ==========================================
// FUNÇÃO SAIR DO JOGO
// ==========================================

function sairDoJogo() {

    sessionStorage.removeItem("jogador");


    jogador = {
        nome: "",
        idade: 0,
        historico: []
    };


    numeroSecreto = 0;

    tentativas = 0;

    jogoAtivo = false;


    campoNome.value = "";

    campoIdade.value = "";

    campoPalpite.value = "";


    campoTentativas.textContent = "0";

    campoMensagem.textContent = "Boa sorte!";


    modalVitoria.style.display = "none";

    telaInicio.style.display = "none";

    telaJogo.style.display = "none";

    telaIdentificacao.style.display = "block";


    campoNome.focus();

}


// ==========================================
// SALVAR JOGADOR
// ==========================================

function salvarJogador() {

    sessionStorage.setItem(
        "jogador",
        JSON.stringify(jogador)
    );

}


// ==========================================
// CARREGAR JOGADOR
// ==========================================

function carregarJogador() {

    let dadosSalvos = sessionStorage.getItem("jogador");


    if (dadosSalvos) {

        jogador = JSON.parse(dadosSalvos);

        mostrarTelaInicio();

    } else {

        telaIdentificacao.style.display = "block";

        telaInicio.style.display = "none";

        telaJogo.style.display = "none";

        campoNome.focus();

    }

}