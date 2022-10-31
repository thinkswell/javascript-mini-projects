
var memory = 0;

function calculating (equation) {
    equation = equation.replace("x", "*")
    return eval(equation);
}

const keys = document.querySelector('.keys')

keys.addEventListener("click", e => {

    let problem_str = document.getElementById("screen").textContent;

    switch(e.target.id) {

        case "0":  
            document.getElementById("screen").innerHTML = problem_str + "0"; 
            break;
        
        case "1":
            document.getElementById("screen").innerHTML = problem_str + "1"; 
            break;

        case "2":
            document.getElementById("screen").innerHTML = problem_str + "2"; 
            break;

        case "3":
            document.getElementById("screen").innerHTML = problem_str + "3"; 
            break;

        case "4":
            document.getElementById("screen").innerHTML = problem_str + "4"; 
            break;

        case "5":
            document.getElementById("screen").innerHTML = problem_str + "5"; 
            break;

        case "6":
            document.getElementById("screen").innerHTML = problem_str + "6"; 
            break;

        case "7":
            document.getElementById("screen").innerHTML = problem_str + "7"; 
            break;

        case "8":
            document.getElementById("screen").innerHTML = problem_str + "8"; 
            break;

        case "9":
            document.getElementById("screen").innerHTML = problem_str + "9"; 
            break;

        case "decimal_point":
            document.getElementById("screen").innerHTML = problem_str + "."; 
            break;

        /**
         * OPERATORS
        */

        case "add":
            document.getElementById("screen").innerHTML = problem_str + "+";
            break;

        case "sub":
            document.getElementById("screen").innerHTML = problem_str + "-"; 
            break;

        case "multi":
            document.getElementById("screen").innerHTML = problem_str + "x"; 
            break;

        case "divide":
            document.getElementById("screen").innerHTML = problem_str + "/"; 
            break;

        /**
         * MORE OPERATORS
        */

        case "squareRoot":
            document.getElementById("screen").innerHTML = (Math.sqrt(calculating(problem_str))).toFixed(6);
            break;
   
        case "square":
            document.getElementById("screen").innerHTML = Math.pow(calculating(problem_str), 2);
            break;

        case "inverse":
            document.getElementById("screen").innerHTML =  calculating ("1/" + calculating(problem_str)).toFixed(6);
            break;
            
        case "plusMinus":
            if (problem_str.charAt(0) != "-")
            {
                document.getElementById("screen").innerHTML = "-" + problem_str;
            }
            else if (problem_str.charAt(0) == "-")
            {
                document.getElementById("screen").innerHTML =  problem_str.substring(1); 
            }
            break;
               
            
        /**
         * 
         * MEMORY OPERATORS
         * 
        */

                
        case "ms":
            if(!isNaN(parseFloat(problem_str))) {
                memory = eval(problem_str); 
            }
            console.log("memory: " + memory);
            break;
            
        case "mc":
            memory = 0;
            console.log("memory: " + memory);
            break;
      
        case "mr":
            document.getElementById("screen").innerHTML = problem_str + memory; 
            break;
                
        case "m+":
            if(!isNaN(parseFloat(problem_str))) {
                memory += calculating(problem_str); 
            }
            console.log("memory: " + memory);
            break;
                


        case "clear":
            document.getElementById("screen").innerHTML = ""
            break;

        case "equal":
            let answer = calculating(problem_str);
            if (answer % 1 != 0) {
                answer = answer.toFixed(6);
            }

            document.getElementById("screen").innerHTML = answer;
            break;

        default:
            console.log("No Match!");

    }

})