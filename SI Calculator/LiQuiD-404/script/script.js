function getInputValue(){  
    var principal = parseFloat(document.getElementById("principal").value); 
    var rate = parseFloat(document.getElementById("rate").value); 
    var time = parseFloat(document.getElementById("time").value);
    var amount = 0.0;
 
    var si = (principal * rate * time)/100;
    amount = parseFloat(principal + si);
    if(isNaN(amount)){
        alert("Enter a valid number!");
        document.getElementById("result").value = "0.0"; 
    
    }
    else{
        document.getElementById("result").value = amount.toFixed(2); 
    }
    
            
}
  

   

function reset(){
    document.getElementById("principal").value = ""; 
    document.getElementById("rate").value = ""; 
    document.getElementById("time").value = ""; 
    document.getElementById("result").value = "0.0"; 
}