console.log("------GAME ON-----")
console.log("\n ((Match of 5 Round's)) ")
console.log("\n**ENTER TYPE: Paper; Stone ; Scissor**")
let userScore=0
let computerScore=0
let i=0
var arrStr = ['Stone','Paper','Scissor']
while(i<5){
  
let user = prompt("*\nEnter your Move:")
var randElement = arrStr[Math.floor(Math.random() * 3)];
  
console.log("Computer's move: ",randElement);
  
if(user==randElement){
    console.log("Draw")
    userScore++
    computerScore++
  }
  
else if(user=="Stone" && randElement=="Paper" || user=="Paper" && randElement=="Stone" || user=="Stone" && randElement=="Paper" || user=="Scissor" && randElement=="Paper" || user=="Stone" && randElement=="Scissor"){
  userScore++
}

else{
  computerScore++
}
  
console.log("\nUserSCore ",userScore," ComputerSCore ",computerScore)
  
i++
console.log("\n")
}


if(userScore>computerScore){
  console.log("RESULTS : Congratualtion!! You Won it!!")
}
else if(userScore<computerScore){
  console.log("RESULTS : Sorry!!! You Lost it!!")
}
else{
  console.log("RESULTS : ----It's a Draw----")
}