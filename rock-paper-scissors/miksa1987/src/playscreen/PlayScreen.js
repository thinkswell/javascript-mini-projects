import styled from 'styled-components';

export const PlayScreen = styled.div`
  display: grid;
  grid-template: 100% / 1fr 1fr;
  min-height: 100%;

  @media screen and (max-width: 600px) {
    grid-template: 2fr 3fr 1fr / 100%;
  }
`;
