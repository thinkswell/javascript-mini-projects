
var result=document.getElementById("result")

function display(number){
    result.value += number;
}

function calculate(){
    var final_number=result.value
    var final_result=eval(final_number);
    result.value=final_result;
}

function clrs() {
    result.value="";
}

function del() {
    result.value=result.value.slice(0,-1);
}