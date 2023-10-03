import React from 'react'
import styled from "styled-components"
const TotalScore = ({score}) => {
  return (
   <Score>
    <h1>{score}</h1>
    <p>CURRENT</p>
   </Score>
  )
}

export default TotalScore

const Score=styled.div`
text-align: center;
display: flex;
flex-direction: column;
border-radius: 20px;
max-width: 200px;
border: 4px solid black;
background-color:lightgray;
width: 380px;
height: 150x;


h1{
    font-size: 100px;
    font-weight: medium;
    line-height: 100px; 

}
p{
    font-size: 24px;
    font-weight: medium;
}
    
`