function desenhaQuadrado(x, y, xTamanho, yTamanho, cor) {
    pincel.fillStyle = cor;
    pincel.fillRect(x, y, xTamanho, yTamanho);
    pincel.fill();
}

function desenhaCirculo(x, y, raio, cor) {
    pincel.fillStyle = cor;
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * 3.14);
    pincel.fill();
}

function desenhaPaletaDeCores() {
    desenhaQuadrado(xPreto, yQuadrados, xTamanhoQuadrados, yTamanhoQuadrados, 'black');
    desenhaQuadrado(xBranco, yQuadrados, xTamanhoQuadrados, yTamanhoQuadrados, 'white');
    desenhaQuadrado(xAzul, yQuadrados, xTamanhoQuadrados, yTamanhoQuadrados, 'blue');
    desenhaQuadrado(xAmarelo, yQuadrados, xTamanhoQuadrados, yTamanhoQuadrados, 'yellow');
    desenhaQuadrado(xVermelho, yQuadrados, xTamanhoQuadrados, yTamanhoQuadrados, 'red');
    desenhaQuadrado(xVerde, yQuadrados, xTamanhoQuadrados, yTamanhoQuadrados, 'green');
    desenhaQuadrado(xLaranja, yQuadrados, xTamanhoQuadrados, yTamanhoQuadrados, 'orange');
    desenhaQuadrado(xRoxo, yQuadrados, xTamanhoQuadrados, yTamanhoQuadrados, 'purple');
    desenhaQuadrado(xAqua, yQuadrados, xTamanhoQuadrados, yTamanhoQuadrados, '#00FFFF');
    desenhaQuadrado(xHotPink, yQuadrados, xTamanhoQuadrados, yTamanhoQuadrados, '#FF69B4');
    desenhaQuadrado(xDarkBlue, yQuadrados, xTamanhoQuadrados, yTamanhoQuadrados, '#00008B');
    desenhaQuadrado(xLime, yQuadrados, xTamanhoQuadrados, yTamanhoQuadrados, 'lightgray');
}

function lidaComMovimentoDoMouse(evento) {

    var x = evento.pageX - tela.offsetLeft;
    var y = evento.pageY - tela.offsetTop;

    if(evento.shiftKey){           

        if(desenha && podeDesenharNaArea(x, y)){

            desenhaCirculo(x, y, raio + 5, corAtual);
        }
        
    }else if(desenha && podeDesenharNaArea(x, y)) {

            desenhaCirculo(x, y, raio, corAtual);
    }
}

function habilitaDesenhar() {
    desenha = true;
}

function desabilitaDesenhar() {
    desenha = false;
}

function trocaDeCor(evento){
    var x = evento.pageX - tela.offsetLeft;
    var y = evento.pageY - tela.offsetTop;

    if (x > xPreto 
            && x < xPreto + xTamanhoQuadrados
                && y > yQuadrados 
                    && y < yTamanhoQuadrados){

        corAtual = "black";

    }else if (x > xBranco
                && x < xBranco + xTamanhoQuadrados
                    && y > yQuadrados 
                        && y < yTamanhoQuadrados){

        corAtual = "white";

    }else if (x > xAzul 
                && x < xAzul + xTamanhoQuadrados
                    && y > yQuadrados 
                        && y < yTamanhoQuadrados){

        corAtual = "blue";

    }else if (x > xAmarelo 
                && x < xAmarelo + xTamanhoQuadrados
                    && y > yQuadrados 
                        && y < yTamanhoQuadrados){

        corAtual = "yellow";

    }else if (x > xVermelho 
            && x < xVermelho + xTamanhoQuadrados
                && y > yQuadrados 
                    && y < yTamanhoQuadrados){

        corAtual = "red";
        
    }else if (x > xVerde 
                && x < xVerde + xTamanhoQuadrados
                    && y > yQuadrados 
                        && y < yTamanhoQuadrados){

        corAtual = "green";

    }else if (x > xLaranja 
                && x < xLaranja + xTamanhoQuadrados
                    && y > yQuadrados 
                        && y < yTamanhoQuadrados){

        corAtual = "orange";

    }else if (x > xRoxo 
                && x < xRoxo + xTamanhoQuadrados
                    && y > yQuadrados 
                        && y < yTamanhoQuadrados){

        corAtual = "purple";
    }else if (x > xAqua 
                && x < xAqua + xTamanhoQuadrados
                    && y > yQuadrados 
                        && y < yTamanhoQuadrados){

        corAtual = "#00FFFF";        
    }else if (x > xHotPink 
                && x < xHotPink + xTamanhoQuadrados
                    && y > yQuadrados 
                        && y < yTamanhoQuadrados){

        corAtual = "#FF69B4";        
    }else if (x > xDarkBlue 
                && x < xDarkBlue + xTamanhoQuadrados
                    && y > yQuadrados 
                        && y < yTamanhoQuadrados){

        corAtual = "#00008B";
    }else if (x > xLime 
                && x < xLime + xTamanhoQuadrados
                    && y > yQuadrados 
                        && y < yTamanhoQuadrados){

        corAtual = "lightgray";
    }
    
}

function podeDesenharNaArea(x, y){

    if (x >= 0
            && x < 600
                && y >= 0
                    && y < 55){
        return false;
    }else {
        return true;
    }
}  

var tela = document.querySelector('canvas');
var pincel = tela.getContext('2d');
pincel.fillStyle = 'lightgray';
pincel.fillRect(0, 0, 600, 400);

var raio = 5;
var desenha = false;
var corAtual;
var xPreto = 0;
var xBranco = 50;
var xAzul = 100;
var xAmarelo = 150;
var xVermelho = 200;
var xVerde  = 250;
var xLaranja = 300;
var xRoxo = 350;
var xAqua = 400;
var xHotPink = 450;
var xDarkBlue = 500;
var xLime = 550;
var yQuadrados = 0;
var xTamanhoQuadrados = 50;   
var yTamanhoQuadrados = 50;   

desenhaPaletaDeCores();

tela.onmousemove = lidaComMovimentoDoMouse;
tela.onmousedown = habilitaDesenhar;
tela.onmouseup = desabilitaDesenhar;
tela.onclick = trocaDeCor;       

//ISSO AINDA ESTA EM FAZE DE TESTE
//tela.onclick = habilitaDesenhar;
//tela.onclick = lidaComUmClick;
