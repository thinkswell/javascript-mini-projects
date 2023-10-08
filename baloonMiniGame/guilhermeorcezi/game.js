var timerId = null; // variavel que armazena a chamada da função timeout
var timing = null;
var total = null;
var result = null;
function iniciaJogo(){

    var url = window.location.search;
    var nivel_game = url.replace("?","");
    var time_sec = 0;

    if(nivel_game == 1){ //1 facil - 120s
        time_sec = 120;
    }

    if(nivel_game == 2){ //2 normal - 60s
        time_sec = 60;
    }

    if(nivel_game == 3){ //3 dificil - 30s
        time_sec = 30;
    }

    //Inserir tempo no spam cronometro
    document.getElementById('cronometro').innerHTML = time_sec;

    //qtd de baloes
    var qtd_balao = 80;
    cria_balao(qtd_balao);

    //exibir qtd de baloes inteiros
    document.getElementById('baloes_inteiros').innerHTML = qtd_balao;

    //exibir baloes estourados
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(time_sec + 1);
    total = time_sec + 1;
}

function contagem_tempo(segundos){
    segundos = segundos - 1;

    if(segundos == -1){
        clearTimeout(timerId);
        game_over();
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;
    timerId = setTimeout("contagem_tempo("+segundos+")",1000);
}

function game_over(){
    alert("Fim De jogo. Você perdeu.");
    remove_eventos_balao();
}

function cria_balao(qtd_balao){

    for(var i=1; i<=qtd_balao; i++){
        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = '12px';
        balao.id = 'b'+i;
        balao.onclick = function(){ estourar(this); };
        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar(b){
    var id_balao = b.id;

    document.getElementById(id_balao).setAttribute("onclick","");
    document.getElementById(id_balao).src='imagens/balao_azul_pequeno_estourado.png';

    pontuacao(-1); 
}

function pontuacao(acao){
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

    baloes_inteiros = parseInt (baloes_inteiros);
    baloes_estourados = parseInt (baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){
    if(baloes_inteiros == 0){
        alert("Você venceu o jogo!");
        parar_jogo();
    }
}

function parar_jogo(){
    clearTimeout(timerId);
}

function restart(){
    location.reload();
}

function remove_eventos_balao(){
    var i=1;

    while(document.getElementById('b'+i)){
        document.getElementById('b'+i).onclick='';
        i++;
    }
}

function pausar_tempo(segundos){
    result = total - timerId;
    clearInterval(timerId);
    remove_eventos_balao();
}

function retomar_tempo(){
    //Tempo diminuindo novamente
    result = result - 1;
    if(result == -1){
        clearTimeout(timerId);
        game_over();
        return false;
    }

    document.getElementById('cronometro').innerHTML = result;
    timerId = setTimeout("contagem_tempo("+result+")",1000);
    
    //Permitindo estourar balões novamente
    var i=1;

    while(document.getElementById('b'+i)){
        document.getElementById('b'+i).onclick=estourar(this);
        i++;
    }

}

function retorna_inicio(){
    window.location.href= 'index.html';
}