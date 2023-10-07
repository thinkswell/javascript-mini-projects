import React, { useState, useEffect } from "react";
import TotalScore from "./TotalScore";
import RoleDice from "./RoleDice";
import Rules from "./Rules";
import { Button, Outline } from "./Button";
import styled from "styled-components";

const EnterGame = () => {
  const [DiceNumber, SetDiceNumber] = useState(1);
  const [showdice, SetShowdice] = useState(false);
  const [chance, SetChance] = useState(true);
  const [score1, SetScore1] = useState(0);
  const [finalscore1, SetFinalScore1] = useState(0);
  const [score2, SetScore2] = useState(0);
  const [finalscore2, SetFinalScore2] = useState(0);
  const [rulesvisible, setRulesVisible] = useState(false);

  function resetGame() {
    SetDiceNumber(1);
    SetShowdice(false);
    SetChance(true);
    SetScore1(0);
    SetFinalScore1(0);
    SetScore2(0);
    SetFinalScore2(0);
  }

  function generateRandomNumber() {
    var num = Math.floor(Math.random() * 6) + 1;
    return num;
  }

  useEffect(() => {
    if (showdice) {
      netScore();
    }
  }, [DiceNumber, showdice]);

  function role() {
    var num = generateRandomNumber();
    SetDiceNumber(num);

    if (!showdice) {
      SetShowdice(true);
    }
  }

  function netScore() {
    if (finalscore1 > 19) {
      alert("Player 1 Won");
      resetGame();
    } else if (finalscore2 > 19) {
      alert("Player 2 Won");
      resetGame();
    }
    if (DiceNumber === 1 && chance === true) {
      SetScore1(0);
      SetChance((prev) => !prev);
    } else if (chance === true) {
      SetScore1((prev) => prev + DiceNumber);
    }

    if (DiceNumber === 1 && chance === false) {
      SetScore2(0);
      SetChance((prev) => !prev);
    } else if (chance === false) {
      SetScore2((prev) => prev + DiceNumber);
    }
  }

  return (
    <>
      <div
        style={{
          margin: " 0px auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxSizing: "border-box",
          padding: "  20px",
        }}
      >
        <div
          style={{
            padding: " 70px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "45px",
            backgroundColor: chance ? "white" : "#D9D9D9", // Apply background color based on chance
          }}
        >
          <h1>PLAYER 1</h1>
          <h1 style={{ fontSize: "80px" }}>{finalscore1}</h1>

          <TotalScore score={score1}></TotalScore>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {showdice && (
            <RoleDice DiceNumber={DiceNumber} role={role}></RoleDice>
          )}
          <Button
            onClick={() => {
              role();
            }}
          >
            <h3>🎲 Roll Dice</h3>
          </Button>
          <Outline
            onClick={() => {
              SetChance((prev) => !prev);
              SetFinalScore1((prev) => prev + score1);
              SetScore1(0);
              SetScore2(0);
              SetFinalScore2((prev) => prev + score2);
            }}
          >
          <h3>📥 Hold   </h3> 
          </Outline>
        </div>

        <div
          style={{
            padding: " 70px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "45px",
            backgroundColor: chance ? "#D9D9D9" : "white", // Apply background color based on chance
          }}
        >
          <h1>PLAYER 2</h1>
          <h1 style={{ fontSize: "80px" }}>{finalscore2}</h1>
          <TotalScore score={score2}></TotalScore>
        </div>
      </div>

      <div
        style={{
          marginTop: "0px",
          marginLeft: "690px",
          display: "flex",
          maxWidth: "228.78px",
          justifyContent: "center",
          flexDirection: "column",
          gap: "10px",
          height: "180px",
        }}
      >
        <Outline
          onClick={() => {
            SetShowdice(false);
            SetScore1(0);
            SetScore2(0);
            SetChance(true);
          }}
        >
          New Game
        </Outline>
        <Button
          onClick={() => {
            setRulesVisible((prev) => !prev);
          }}
        >
          {" "}
          {rulesvisible ? "Hide Rules" : "Show Rules"}{" "}
        </Button>
      </div>

      {rulesvisible && <Rules></Rules>}
    </>
  );
};

export default EnterGame;
