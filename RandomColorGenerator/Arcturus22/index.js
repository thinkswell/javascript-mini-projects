

document.getElementById("b1").onclick = function () {
    let r, g, b, appleColor;
    r = Math.round(Math.random() * 256);
    g = Math.round(Math.random() * 256);
    b = Math.round(Math.random() * 256);
    appleColor = 'RGB(' + r + ',' + g + ',' + b + ')';
    document.getElementById("Color").style.backgroundColor 
    = appleColor;
    document.getElementById("color-text").innerHTML=
    appleColor;
    

}
document.getElementById("b2").onclick = 
function(){
    
    let color="white";
    document.getElementById("Color").style.backgroundColor
    =color;
    document.getElementById("color-text").innerHTML=
    "White";
}

