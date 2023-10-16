





function calculate(){


var name = document.getElementById("name1").value.toLowerCase();
var name2 = document.getElementById("name2").value.toLowerCase();
console.log(name);

// let name = "hari".toLowerCase();
// let name2 = "naruto".toLowerCase();



let array = name.split("");
array.push(...name2.split(""));
console.log(array);
let finalLetters = [];
let equaledchar = {
    value : [],
    index : [],
}
let scoreSequence = [];
let ansSequence =[];
let ans = 0 ;


for(i=0;i<array.length;i++){
    for(j=1;j<array.length;j++){

            if(array[i]===array[j]){
                         

                        if( i != (j)){

                            console.log(i);
                            console.log(j-1);
                            console.log(array[i]);
                            console.log(array[j]);
                            scoreSequence.push(2);
                            equaledchar.value.push(array[i]);
                            // equaledchar.value.push(array[j]);
                            equaledchar.index.push(i);
                            equaledchar.index.push(j);
                            // array.pop(array[j]);
                            // array.pop(array[i]);
                        }else{
                            console.log("Same Index");
                            // finalLetters.push()
                        }
                
            }else{
                console.log("Not equal")
            }
        
    }
}




equaledchar.index = equaledchar.index.filter( (item, index) => 
    equaledchar.index.indexOf(item) === index);

console.log(finalLetters);
console.log(equaledchar);
console.log(equaledchar.index);

// equaledchar.index.sort();
equaledchar.index.sort(function(a, b){return a - b});
console.log(equaledchar.index);

for(i=0;i<equaledchar.index.length;i++)
{
     array.splice(equaledchar.index[i]-i,1);

}

console.log(array);
console.log(scoreSequence);

scoreSequence.splice(0,scoreSequence.length/2);
// console.log(scoreSequence);

for(i = 0 ; i< array.length;i++){
    // console.log(array[i]);
    scoreSequence.push(1);
}





    recursingScoreSequence(scoreSequence);


 function recursingScoreSequence(sequence){

for(i =0 ; i<sequence.length;i++){
    if(ans > 100){
        ans=100;
    }else{
        // console.log(((sequence.length)/2));
    if( (sequence.length % 2) === 0  ){
          if(i<= ((sequence.length-1)/2)){
             
              ansSequence.push(sequence[i] + (sequence[(sequence.length-1) - i] ));
        // console.log((sequence[i]) + (sequence[(sequence.length-1) - i] ));
              ans += (sequence[i]) + (sequence[(sequence.length-1) - i] );
    }
        }else{
       
        if(i=== Math.round(((sequence.length- 1 )/2)))
        {
                 // console.log(sequence[Math.round((sequence.length/2))]);   
                ansSequence.push(sequence[Math.round((sequence.length/2))]);
            // console.log(ansSequence);
            ans +=  sequence[Math.round((sequence.length/2))];
            // console.log(sequence[Math.round((sequence.length/2))]);
            // console.log("%th e")
        }else{
             // console.log("here");
      
        // console.log(sequence[i] + (sequence[(sequence.length-1) - i] ));
        ansSequence.push(sequence[i] + (sequence[(sequence.length-1) - i] ));
        ans += (sequence[i]) + (sequence[(sequence.length-1) - i] );
       

            
        }
         
          
       
    }
  
    
    }
}

    ansSequence.splice(0,ansSequence.length/2);
  
    console.log(ansSequence.length)

     // console.log(Math.round(((sequence.length- 1 )/2)));
}


console.log(ansSequence);
const noOfRepeaters = Math.round((equaledchar.index.length-1)/2);
console.log(noOfRepeaters);
console.log(ans);
console.log(ans*noOfRepeaters);

var resultTag = document.getElementsByClassName("result")[0];  
var resultBtn = document.getElementsByClassName("btn")[0];  
console.log(resultTag)
resultTag.classList.add("show");
resultBtn.classList.add('pre-animation');
if(ans*noOfRepeaters === 0){
    resultBtn.innerHTML = "Oops!";
}
else if(ans*noOfRepeaters < 100){
    resultBtn.innerHTML = ans*noOfRepeaters + "%";
}else{
    resultBtn.innerHTML = 100 + "%";
    console.log("Perusu")
}

setTimeout(function(){
    resultBtn.classList.remove('pre-animation');
},100)
}
// Steps
// 1. Count the total characters in the two string.
// 2. Store the individual characters in an array.
// 3. Count the repeated characters in the array.
// 4. Store the repeated characters reoeat values in a seperate array.
// 5. 

