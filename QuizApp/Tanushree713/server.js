
const quizBox = [
    { question :"Q1 : What is the Full Form Of HTML ? ",
             a :"Hello To My Land ",
             b :"Hey Markup Text Language",
             c :"Hyper Markup Language",
             d :"HyperText Markup Language",
            ans : "ans4" ,

    },
    { question :"Q2 : What is the Full Form Of JS ? ",
             a :"JavaScript ",
             b :"Java Scope",
             c : "Jango scoping",
             d : " JavaStyle",
             ans : "ans1" ,
    },
    { question :"Q3 : What is the Full Form Of CSS ? ",
             a :"Cascading Style Sheep",
             b :"Cascading Style Sheet",
             c : "Cartoons Style Sheets",
             d : "Cascading Super Sheet",
             ans : "ans2" ,
    },
    { question :"Q4 : What is the Full Form Of HTML ? ",
             a :"Hello To My Land ",
             b :"Hey Markup Text Language",
             c : "HyperText Markup Language",
             d : "Hyper Markup Language",
             ans : "ans3" ,
    },
]
const questions = document.querySelector(".head");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const btn = document.querySelector("#submit");
const answers = document.querySelectorAll(".answer");
const showScore = document.querySelector("#showScore");

let questionCount = 0 ;
let score = 0 ;

function loadQuestion(){
    const questionList = quizBox[questionCount] ;
    questions.innerText = questionList.question ;
    option1.innerHTML = questionList.a ;
    option2.innerHTML = questionList.b ;
    option3.innerHTML = questionList.c ;
    option4.innerHTML = questionList.d ;
    
}
loadQuestion();

function getAnswer(){
    let answer ;
    answers.forEach((curAnsEl ) => {
     if(curAnsEl.checked){
        answer = curAnsEl.id;
     }
    });
    return answer;
}

btn.addEventListener('click' , ()=>{
    const checkedAnswer = getAnswer();

    if( checkedAnswer === quizBox[questionCount].ans){
       score++ ;
    }

    questionCount ++ ;

    if(questionCount < quizBox.length){
        loadQuestion();
    }
    else{
        showScore.innerHTML =
       ` <h3> Your Score ${score} / ${ quizBox.length} </h3>
       <button id="btn1" onclick="location.reload()" >Play Again </button>`;
       showScore.style.display = "block" ;
        
    }
})
