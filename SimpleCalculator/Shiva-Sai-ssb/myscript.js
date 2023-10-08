let input = document.getElementById("inputbox");
input.addEventListener('keypress', (e)=>{
    const charCode = e.charcode

    if( 65<=charCode<=90 || 97<=charCode<=122){
        e.preventDefault()
    }

})
let buttons = document.querySelectorAll("button");

let string = "";
let arr = Array.from(buttons)

arr.forEach(button =>{
    button.addEventListener("click", (e)=>{
        if(e.target.innerHTML == '='){
            string = eval(string);
            input.value = string
        }

        else if(e.target.innerHTML=="AC"){
            string='';
            input.value=string;
        }

        else if(e.target.innerHTML == "DEL"){
            string=string.substring(0,string.length-1);
            input.value= string;
        }
        else{
            if (/^[\d+*\/%-]$/.test(e.target.innerHTML)) {
                string += e.target.innerHTML;
                input.value = string;
            }
        }
    })
})