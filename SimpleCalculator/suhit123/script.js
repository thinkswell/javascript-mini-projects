function clearans(){
    document.getElementById('input_box').value="";
}
function display(value){
    if(value=='*' || value=='/'||value=='+'||value=='-'||value=='%'){
       var check=document.getElementById('input_box').value;
       if(check[check.length-1]=='*'||check[check.length-1]=='/'||check[check.length-1]=='+'||check[check.length-1]=='-'||check[check.length-1]=='%'){
        document.getElementById('input_box').value=check.slice(0,check.length-1);
        document.getElementById('input_box').value+=value;
        return;
       }
    }
    document.getElementById('input_box').value+=value;
}
function backspace(){
    const a=document.getElementById('input_box').value;
    if(a!=""){
        document.getElementById('input_box').value=a.slice(0,a.length-1);
    }
}
function history(p,q){
    if(p!=q){
    const heading=document.createElement('h1');
    const element=document.createTextNode(p+" = "+q);
    heading.appendChild(element);
    document.getElementById("history_data").appendChild(heading);
    }
}
const container = document.getElementById("history_data");

const btn = document.getElementById('btn');

btn.addEventListener('click', function handleClick() {
  container.replaceChildren();
});
function answer(){
    var p = document.getElementById("input_box").value;
    var q = eval(p);
    history(p,q);
    document.getElementById("input_box").value = q;
}
