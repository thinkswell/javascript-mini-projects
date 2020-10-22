import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  position: fixed;
  bottom: 5rem;
  left: 3rem;
  right: 3rem;

  display: grid;
  grid-template: 60% 40% / 100%;
  border: 1px solid lightgrey;

  background-color: #44475a;
  color: #ff79c6;

  padding: 15px;
`;

export const GameOverPopup = ({ winner, resetGame }) => (
  <Layout>
    {winner !== 'tie' ? <h3>{winner} has won!</h3> : <h3>It's a tie!</h3>}
    <button onClick={resetGame}>Play again</button>
  </Layout>
);
