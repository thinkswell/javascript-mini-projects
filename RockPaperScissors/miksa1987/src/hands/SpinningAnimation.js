import styled from 'styled-components';

export const SpinningAnimation = styled.div`
  animation: spinning-animation infinite 10s linear;
  padding: 1rem;
  border: 3px solid #ff79c6;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  @keyframes spinning-animation {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }
`;
