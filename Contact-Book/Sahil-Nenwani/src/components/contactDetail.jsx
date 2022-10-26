import React from 'react'
import {Link} from "react-router-dom" 
import User from '../images/profile.png'

const contactDetails=(props)=>{
    // console.log(props)
   const {name,email}=props.location.state.contacts
return(
    <div className="main">
        <div className="ui card centered">
            <div className="image">
            <img src={User} alt="profile" />
            </div>
            <div className="content" >
                <div className="header">{name}</div>
                <div className="description">{email}</div>
            </div>
        </div>
        <div className="text-center">
            <Link to="/">
            <button className="ui button blue">Back to Contact List</button>
            </Link>
        </div>
    </div>
    );
}

export default contactDetails;