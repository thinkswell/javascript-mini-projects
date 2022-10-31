import React from "react";
import { Link } from "react-router-dom";
import Triangle from "../images/bg-triangle.svg";
import paper from "../images/icon-paper.svg";
import scissors from "../images/icon-scissors.svg";
import rock from "../images/icon-rock.svg";


function Play({ setUserChoice }) {


  function setChoice(e) {
    setUserChoice(e.target.dataset.id);
  }

  return (
    <div className="play">
      <img className="play__triangle" src={Triangle} alt="" />
        <div className="play__paper">
      <Link to="/game" onClick={setChoice}>
          <img  data-id="paper"  src={paper} alt="paper" />
      </Link>
        </div>
        <div className="play__rock" >
      <Link to="/game" onClick={setChoice}>
        <img src={rock} data-id="rock"  alt="rock" />
      </Link>
        </div>
        <div className="play__scissors" >
      <Link to="/game" onClick={setChoice}>
        <img src={scissors} data-id="scissors" alt="scissors" />
      </Link>
        </div>
    </div>
  );
}

export default Play;
