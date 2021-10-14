import React,{useState} from 'react';

export default function App(){
  const ques=[
    {
      quesText: 'Which Flower is known as ChinaRose?',
      answeroptions:[
        {answerText: 'Rose', isCorrect: false},
        {answerText:'Lily', isCorrect: false},
        {answerText:'Hibiscus', isCorrect:true},
        {answerText:'Marigold', isCorrect:false},
      ],

    },
    {
      quesText: 'Which Color has the longest Wavelength?',
      answeroptions:[
        {answerText:'Red', isCorrect: true},
        {answerText:'Violet', isCorrect: false},
        {answerText:'Yellow', isCorrect:false},
        {answerText:'Orange', isCorrect:false},
      ],

    },
    {
      quesText: 'Who is the richest man in this world?',
      answeroptions:[
        {answerText: 'Bill Gates', isCorrect: false},
        {answerText:'Elon Musk', isCorrect: false},
        {answerText:'Jeff Bezos', isCorrect:true},
        {answerText:'Mukesh Ambani', isCorrect:false},
      ],

    },
    {
      quesText: 'Earth is known as_______',
      answeroptions:[
        {answerText: 'blue planet', isCorrect: true},
        {answerText:'whale planet', isCorrect: false},
        {answerText:'green planet', isCorrect:false},
        {answerText:'not a venus daah', isCorrect:false},
      ],

    },
    {
      quesText: 'Which anime has character named as isdeath?',
      answeroptions:[
        {answerText: 'Damon Slayer', isCorrect: false},
        {answerText:'Akame ga Kill', isCorrect: true},
        {answerText:'The promised Neverland', isCorrect:false},
        {answerText:'Oregairu', isCorrect:false},
      ],

    },
    {
      quesText: 'How many Harry Potter Books are there?',
      answeroptions:[
        {answerText: '5', isCorrect: false},
        {answerText:'6', isCorrect: false},
        {answerText:'7', isCorrect:true},
        {answerText:'10', isCorrect:false},
      ],
    },

  ];
  const[currentQuestion,setcurrentQuestion] = useState(0);
  const[showScore,setshowScore] = useState(false);
  const[score,setscore] = useState(0);
  
  const handleAnswerOptionClick = (isCorrect) =>
  {
      if(isCorrect)
      {
        setscore(score+1);
       
      }
      const nextQuestion = currentQuestion+1;
      if(nextQuestion < ques.length)
      {
        setcurrentQuestion(nextQuestion);
      }
      else
      {
        setshowScore(true);
      }
  
  };
     return(
       <div className='app'>
          <h3> WELCOME TO MY QUIZ APP</h3>
         {
           showScore ?
            (
             <div className='score-section'>
               You scored {score} out of {ques.length}
             </div>

           ) : (
             <>
             <div className= 'ques-section'>
             <div className= 'ques-count'>
              <span>ques {currentQuestion+1}</span>/{ques.length}
             </div>
             <div className='quesText'>{ques[currentQuestion].quesText}</div>
             </div>
             <div className='answer-section'>
               {ques[currentQuestion].answeroptions.map((answeroptions) => (
               <button onClick={() => handleAnswerOptionClick(answeroptions.isCorrect)}> {answeroptions.answerText}</button>
               ))}</div>
               </>
           )}
           </div>
     );
               };
