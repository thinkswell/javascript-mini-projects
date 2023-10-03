import React from "react";
import styled from "styled-components";
const Rules = () => {
  return (
    <Rulesdiv>
      <h2>How to play dice game</h2>

      <br></br>
      <p> Each player is allowed to roll the dice till the dice shows 1.</p>
      <p>
        As soon as dice shows zero all the cumulative scores till now becomes
        zero
      </p>
      <p>
        If the player holds the score then his/her score is added to his
        permanent final score.
      </p>
      <p>The first player to score a permanent score of 20 wins!! </p>
    </Rulesdiv>
  );
};

export default Rules;

const Rulesdiv = styled.div`
  max-width: 750px;
  background-color: #fbf1f1;
  padding: 20px;
  margin: 0 auto;

  h2 {
    font-size: 24px;
    font-weight: bold;
  }
`;
