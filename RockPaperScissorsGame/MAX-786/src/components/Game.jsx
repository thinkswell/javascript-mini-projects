import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import paper from "../images/icon-paper.svg";
import scissors from "../images/icon-scissors.svg";
import rock from "../images/icon-rock.svg";

function Game({ score, userChoice, setScore }) {
  const [playerResult, setPlayerResult] = useState("");
  const [pcChoice, setPcChoice] = useState("");
  const [isPending,setIsPending] = useState(true);
  const [ct, setCounter] = useState(3);


  function pcPicking() {
    const choices = ["rock", "paper", "scissors"];
    setPcChoice(choices[Math.floor(Math.random() * 3)]);
  }

  useEffect(pcPicking, []);
  
  function Result(){
    if (userChoice ==="rock" && pcChoice==="paper"){
      setScore(score-1);
      setPlayerResult("YOU LOST");
    }
    else if (userChoice ==="rock" && pcChoice==="scissors"){
      setScore(score+1)
      setPlayerResult("YOU WON");
    }
    else if (userChoice ==="scissors" && pcChoice==="paper"){
      setScore(score+1)
      setPlayerResult("YOU WON");
    }
    else if (userChoice ==="scissors" && pcChoice==="rock"){
      setScore(score-1);
      setPlayerResult("YOU LOST");
    }
    else if (userChoice ==="paper" && pcChoice==="rock"){
      setScore(score+1)
      setPlayerResult("YOU WON");
    }
    else if (userChoice ==="paper" && pcChoice==="scissors"){
      setScore(score-1);
      setPlayerResult("YOU LOST");
    }
    else {
      setPlayerResult("It's a DRAW");
    }
  }

  useEffect(() => {
    const timer = ct > 0 ? setInterval(() => {
      setCounter(ct-1);
    }, 1000):Result();
    if (ct === 0){
      setIsPending(false);
    }
    return () => {
      clearInterval(timer);
    }
  },[ct,pcChoice]);

  return (
    <div className="game">
      <div className="game__user">
          <h1>YOU PICKED</h1>
          
            {userChoice === "paper" && <div className={playerResult === "YOU WON"?"image paper winner":"image paper"}><img  src={paper} alt="paper" /> </div>}      
            {userChoice === "rock" && <div className={playerResult === "YOU WON"?"image rock winner":"image rock"}><img src={rock} alt="rock" /> </div>}      
            {userChoice === "scissors" && <div className={playerResult === "YOU WON"?"image scissors winner":"image scissors"}><img src={scissors} alt="scissors" /> </div>}      
      
      </div>
     

      { playerResult !=="" && <div className="game__result">
          <h1>{playerResult}</h1>
          <span className="play_again">
            <Link to="/" 
                  onClick={()=>{
                    setPcChoice("");
                    setIsPending(!isPending);
                  }}>
              <div>PLAY AGAIN</div>
            </Link>
          </span>
      </div>}

      <div className="game__pc">
          <h1>THE HOUSE PICKED</h1>
          {!isPending ? <div>
            {pcChoice === "paper" && <div className={playerResult === "YOU LOST"?"image paper winner":"image paper"}><img  src={paper} alt="paper" /> </div>}      
            {pcChoice === "rock" && <div className={playerResult === "YOU LOST"?"image rock winner":"image rock"}><img src={rock} alt="rock" /> </div>}      
            {pcChoice === "scissors" &&  <div className={playerResult === "YOU LOST"?"image scissors winner":"image scissors"}><img src={scissors} alt="scissors" /> </div>}      
          </div>: <div className="game__counter"><span>{ct}</span></div>}
      </div>
    </div>
  );
}

export default Game;
