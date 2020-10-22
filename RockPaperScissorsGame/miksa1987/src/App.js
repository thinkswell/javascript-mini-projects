import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { PlayScreen } from './playscreen/PlayScreen';
import { PlayerSection } from './playscreen/PlayerSection';
import { ComputerSection } from './playscreen/ComputerSection';

import { Footer } from './footer/Footer';

import { GameOverPopup } from './gameoverpopup/GameOverPopup';

const Layout = styled.div`
  display: grid;
  grid-template: 2rem 1fr 3rem;
`;

const Header = styled.h1`
  display: flex;
  justify-content: center;
  color: #f1fa8c;
`;

const App = () => {
  const [playerHand, setPlayerHand] = useState(null);
  const [playerScore, setPlayerScore] = useState(0);

  const [computerHand, setComputerHand] = useState(null);
  const [computerPlayed, setComputerPlayed] = useState(false);
  const [computerScore, setComputerScore] = useState(0);

  const [winner, setWinner] = useState(null);
  const [isPlayable, setIsPlayable] = useState(true);

  const winSound = new Audio('/sound/win.wav');
  const loseSound = new Audio('/sound/lose.wav');

  const hands = {
    rock: {
      beats: 'scissors',
    },
    paper: {
      beats: 'rock',
    },
    scissors: {
      beats: 'paper',
    },
  };

  // TODO
  // Gruvbox colors? Or dracula?
  // TESTS

  useEffect(() => {
    if (playerHand && computerHand) {
      if (hands[playerHand].beats === computerHand) {
        setWinner('Player');
        setPlayerScore(playerScore + 1);
        setIsPlayable(false);
        winSound.play();
      } else if (hands[computerHand].beats === playerHand) {
        setWinner('Computer');
        setComputerScore(computerScore + 1);
        setIsPlayable(false);
        loseSound.play();
      } else {
        setWinner('tie');
        setIsPlayable(false);
        winSound.play();
      }
    }
  }, [playerHand]);

  const playHand = (hand) => {
    setPlayerHand(hand);
    playComputerHand();
  };

  const playComputerHand = () => {
    const randomIndex = Math.floor(Math.random() * Object.keys(hands).length);
    const possibleHands = Object.keys(hands);

    setComputerHand(possibleHands[randomIndex]);
    setComputerPlayed(true);
  };

  const resetGame = () => {
    setComputerHand(null);
    setPlayerHand(null);
    setComputerPlayed(false);
    setWinner(null);
    setIsPlayable(true);
  };

  console.log(playerHand);
  return (
    <Layout>
      <Header>Rock Paper Scissors</Header>
      <PlayScreen>
        <ComputerSection hand={computerHand} played={computerPlayed} />
        <PlayerSection
          isPlayable={isPlayable}
          playHand={playHand}
          hand={playerHand}
        />
        <div className="placeholder" />
      </PlayScreen>
      <Footer playerScore={playerScore} computerScore={computerScore} />
      {computerPlayed && (
        <GameOverPopup winner={winner} resetGame={resetGame} />
      )}
    </Layout>
  );
};

export default App;
