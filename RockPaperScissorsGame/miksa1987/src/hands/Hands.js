import React from 'react';
import styled from 'styled-components';

import { Image } from '../common/Image';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  padding: 0.5rem;
  border: 3px solid #f1fa8c;
  border-radius: 50%;
`;

const Button = styled.button`
  border: none;
  background-color: rgba(0, 0, 0, 0);
`;

export const Rock = ({ onClick }) => (
  <Div>
    <Button onClick={onClick}>
      <Image src="/img/rock.png" />
    </Button>
  </Div>
);

export const Paper = ({ onClick }) => (
  <Div>
    <Button onClick={onClick}>
      <Image src="/img/paper.png" />
    </Button>
  </Div>
);

export const Scissors = ({ onClick }) => (
  <Div>
    <Button onClick={onClick}>
      <Image src="/img/scissors.png" />
    </Button>
  </Div>
);
