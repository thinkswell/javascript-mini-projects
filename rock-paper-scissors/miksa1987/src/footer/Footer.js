import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;

  display: grid;
  grid-template: 3rem / 1fr 1fr;
  border: 1px solid lightgrey;

  padding: 5px;

  background-color: #44475a;
  color: #ff79c6;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Footer = ({ playerScore, computerScore }) => (
  <Layout>
    <Div>
      <strong>Computer: </strong>
      <p>{computerScore}</p>
    </Div>
    <Div>
      <strong>Player: </strong>
      <p>{playerScore}</p>
    </Div>
  </Layout>
);
