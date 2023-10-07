import { Button } from "./Button";
import styled from "styled-components";

const PlayGame = ({ toggle }) => {
  return (
    <Container>
      <div>
        <img src="/images/dices.png"></img>
      </div>
      <div className="content">
        <h1>DICE GAME</h1>
        <Button onClick={toggle}>Play Now</Button>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 70px;
  max-width: 1182px;
  margin: 180px auto;
  position: relative;
  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .content h1 {
    font-size: 98px;
    max-width: 528px;
    white-space: nowrap;
    font-weight: 900;
  }
`;

export default PlayGame;
