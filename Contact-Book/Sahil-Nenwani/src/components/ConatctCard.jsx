import React from 'react'
import {Link} from "react-router-dom" 
import User from '../images/user.png'

const ContactCard=({contact,clickHandler})=>{
return(
<div className="item">
        <img src={User} alt="user profile" className="ui avatar image" />
                <div className="content">
                    <Link to={{pathname:`/Contact/${contact.id}`, state:{contacts:contact} }}>
                    <div className="header">{contact.name}</div>
                    <div>{contact.email}</div>
                    </Link>
                </div>
                <i onClick={()=>clickHandler(contact.id)} className="trash alternate outline icon right floated" style={{color:'red', fontSize:'2em', marginTop:"2px",marginLeft:"10px" }}></i>
             <Link to={{pathname:`/edit`, state:{contacts:contact}}} >
                <i className="edit alternate outline icon right floated" style={{color:'blue', fontSize:'2em', marginTop:"2px"}}></i>
                </Link>
            </div>

);
}

export default ContactCard;