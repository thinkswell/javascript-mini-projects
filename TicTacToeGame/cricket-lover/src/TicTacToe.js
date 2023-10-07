import React, { useState } from "react";
import Board from "./Board";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const hasWon = function (tiles) {
  let hasWon = false;
  winningCombinations.forEach(([c1, c2, c3]) => {
    const isMatched =
      tiles[c1] && tiles[c1] === tiles[c2] && tiles[c1] === tiles[c3];
    hasWon = hasWon || isMatched;
  });
  return hasWon;
};

const TicTacToe = () => {
  const [currentState, setCurrentState] = useState({
    boardDetails: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: { name: "X", symbol: "X" },
    nextPlayer: { name: "O", symbol: "O" },
    isGameOver: false,
    movesCount: 0,
  });

  const [scores, setScores] = useState({ x: 0, o: 0 });

  const handleClick = (tileId) => {
    const { boardDetails, currentPlayer } = currentState;
    if (boardDetails[tileId] === "") {
      const updatedDetails = boardDetails.slice();
      updatedDetails[tileId] = currentPlayer.symbol;
      const hasOver = hasWon(updatedDetails);
      const newScores =
        currentState.currentPlayer.name === "X"
          ? { ...scores, x: scores.x + 1 }
          : { ...scores, o: scores.o + 1 };
      setScores(newScores);
      setCurrentState((state) => ({
        movesCount: state.movesCount + 1,
        boardDetails: updatedDetails,
        currentPlayer: state.nextPlayer,
        nextPlayer: state.currentPlayer,
        isGameOver: hasOver,
      }));
    }
  };

  if (currentState.isGameOver) {
    return (
      <h1 style={{ textAlign: "center" }}>
        <br />
        Congratulations {currentState.nextPlayer.name}
        <br />
        <br />
        You Won!!!!
      </h1>
    );
  }
  if (currentState.movesCount === 9) {
    return (
      <h1 style={{ textAlign: "center" }}>
        <br />
        <br />
        <br />
        Game Draw
      </h1>
    );
  }
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>
        Player {currentState.currentPlayer.name}'s turn
      </h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "36px" }}>
        <Board boardDetails={currentState.boardDetails} onClick={handleClick} />
        <div>
          <h3>Scores</h3>
          <p>
            <strong>X</strong>: {scores.x}
          </p>
          <p>
            <strong>O</strong>: {scores.o}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
