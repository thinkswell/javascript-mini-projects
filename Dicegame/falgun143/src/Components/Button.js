
import styled from "styled-components"

export const Button =styled.button`
    background-color: black;
    width: 150px;
    height: 44px;
    color: white;
    border-radius: 5px;
    padding:18px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border:none;
    right: -30px;
    font-size: 16px;
    transition-duration: 0.6s;
    border:1px solid transparent;
    &:hover{
        background-color: white;
          border:1px solid black;
          color: black;
        transition-duration: 0.6s;
    }
  
`

export const Outline=styled(Button)`

color: black;
background-color: white;
border: 1px solid  black;

&:hover{
        background-color: black;
          border:1px solid black;
          color: white;
      
        transition-duration: 0.6s;
    }

`