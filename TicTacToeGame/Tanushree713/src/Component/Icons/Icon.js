import React from 'react'
import {FaRegCircle, FaPen , FaTimes} from 'react-icons/fa' ;

function Icon({name}){
  if(name == "circle"){
   return <FaRegCircle/>
  } else if( name == "cross"){
   return <FaTimes/>
  } else {
    return <FaPen/>
  }
}

export default Icon;