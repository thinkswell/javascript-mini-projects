let ans = Math.floor((Math.random() * 100) + 1);
var attemps=0;


function check() {
    var number = document.getElementById("number").value;
    //document.getElementById("status").innerHTML = "Hello World";
    if(number==ans){
        document.getElementById("status").innerHTML = "You Win";
		alert("You Win in "+attemps+" Attempts");
		location.reload();

		

    }
    if(number>ans){
        document.getElementById("status").innerHTML = "Answer is smaller";
		attemps++;
		document.getElementById("number").value="";
    }
    if(number<ans){
        document.getElementById("status").innerHTML = "Answer is greater";
		attemps++;
		document.getElementById("number").value="";
    }
  }