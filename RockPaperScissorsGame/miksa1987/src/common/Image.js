import styled from 'styled-components';

export const Image = styled.img`
  height: ${(props) => (props.big ? '150%' : '100%')};
  width: auto;
`;
