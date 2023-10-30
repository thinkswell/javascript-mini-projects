let value = ""

let ans = 0


function setInput(){
    let input  = document.getElementById("ans");
    input.value = value
}

window.onload = function () {
    setInput()
}
function NumberButtonClick(number){

value +=number

setInput()
}
function functionButton(Function){
  
    let input  = document.getElementById("ans");
    if (input.value =="" || input.value==null) {return ;}
   switch(Function){
case functionVar.add:
  
value+="+";
break;
case functionVar.substraction:
    value+="-";
break;
case functionVar.multiplication:
    value+="x";
break;
case functionVar.equal:
ans = eval(value.replace("x","*").replace("%","*1/100").replace("^","**"));
value = ans;
break;
case functionVar.division:
    value+="/";
break;
case functionVar.percentage:
    value+="%";
break;
case functionVar.power:
value += "^";
break;
case functionVar.clear:
    value = "";
    break;
case functionVar.backspace:
value  =value.slice(0,-1)    
break;
case functionVar.decimal:
    value+=".";
break;
}


setInput()

}