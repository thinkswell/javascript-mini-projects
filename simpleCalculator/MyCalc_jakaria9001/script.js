function getHistory(){
    return document.getElementById("history-value").innerText;
}

// alert(getHistory());
function printHistory(num){
    if(num==""){
        document.getElementById("history-value").innerText = num;
    }else document.getElementById("history-value").innerText = (num);
}
// printHistory("32+95");
function getOutput(){
    return (document.getElementById("output-value").innerText);
}
// alert(getOutput());

function printOutput(num){
    if(num==""){
        document.getElementById("output-value").innerText = num;
    }else document.getElementById("output-value").innerText = formatNumber(num) ;
}
// printOutput("65446161");
function formatNumber(num){
    if(num=='-'){
        return "";
    }
    let n = Number(num);
    let value = n.toLocaleString("en");
    return value;
}
function reverseNumber(num){
    return Number(num.replace(/,/g,'')); // 9,999 => 9999
    // return parseInt(num).toString();
}
// alert(reverseNumber(getOutput()));
var operator = document.getElementsByClassName("operator");
for(var i=0;i<operator.length;i++){
    operator[i].addEventListener('click', function(){
        // alert("The bottom clicked: " + this.id);
        if(this.id=="clear"){
            printHistory("");
            printOutput("");
        }
        else if(this.id=="backspace"){
            var output = reverseNumber(getOutput()).toString();
            if(output){
                output = output.substr(0,output.length-1);
                printOutput(output);
            }
        }else {
            
            var output=getOutput();
			var history=getHistory();

			if(output=="" && history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			else if(output!="" || history!=""){
				output= output==""?output:reverseNumber(output);
				history= history+output;
				if(this.id=="sqrt"){
                    printOutput(Math.sqrt(parseInt(history)));
					printHistory("sqrt(" + history + ")");
                }else if(this.id=="log"){
                    printOutput(Math.log(parseInt(history)));
					printHistory("log(" + history + ")");
                }
                else if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory(history);
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
        }
    });
}
var number = document.getElementsByClassName("number");
for(var i=0;i<number.length;i++){
    number[i].addEventListener('click', function(){
        // alert("The bottom clicked: " + this.id);
        var output = reverseNumber(getOutput());
        if(output!=NaN){
            output = output+this.id;
            printOutput(output);
        }
    });
}