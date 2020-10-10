import React from 'react';
import styled from 'styled-components';

import {
  SpinningRock,
  SpinningPaper,
  SpinningScissors,
} from '../hands/SpinningHands';

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.div`
  padding: 1rem;
  border: 4px solid red;
  border-radius: 50%;
  background: rgb(198, 0, 0);
  background: radial-gradient(
    circle,
    rgba(198, 0, 0, 0.6558998599439776) 0%,
    rgba(252, 70, 70, 0) 100%
  );
`;

export const ComputerSection = ({ hand, played }) => {
  return (
    <Layout>
      {played && hand === 'rock' && (
        <Circle>
          <SpinningRock />
        </Circle>
      )}
      {played && hand === 'paper' && (
        <Circle>
          <SpinningPaper />
        </Circle>
      )}
      {played && hand === 'scissors' && (
        <Circle>
          <SpinningScissors />
        </Circle>
      )}
      {!played && <h3>Choose a hand!</h3>}
    </Layout>
  );
};
