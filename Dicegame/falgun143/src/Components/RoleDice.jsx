import React from 'react'
import styled from "styled-components"
import { useState } from "react"

const RoleDice = ( {DiceNumber}) => {



  return (
    <Dice >
         <img  style={{width: "120px"}}  src={`images/dice_${DiceNumber}.png`} ></img>
         <br></br>
       
    </Dice>
       
  
  )
}

export default RoleDice

const Dice=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
      // IMP

    

    p{
        font-size:24px;
        font-weight: 500;
    }
`