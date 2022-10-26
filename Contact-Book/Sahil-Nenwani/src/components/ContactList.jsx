
import React,{useRef}  from "react";
import {Link} from "react-router-dom"
import ContactCard from "./ConatctCard";
const ContactList=({getcontacts,getConatctid,term,searchKeyword})=>{
    const inputE1=useRef("");
    const deleteContactHandler=(id)=>{
        getConatctid(id)
    }
    const renderContactList= getcontacts.map((contact)=>{

        return(
            <ContactCard contact={contact}  clickHandler={deleteContactHandler} />
        );
    });
    const getSearchTerm=()=>{
        searchKeyword(inputE1.current.value);
    }
    return (
      <div>
          <h2>Contact List
              <Link to='/add'>
          <button className="ui button blue right floated">Add Contact</button> 
          </Link>  
           </h2>
    <div className="ui search">
        <div className="ui icon input">
            <input ref={inputE1} type="text" placeholder="search Contacts" className="prompt" value={term} onChange={getSearchTerm} />
        <i className="search icon"></i>
        </div>
        </div>         
    <div className="ui celled list">
        {renderContactList.length > 0 ? renderContactList : "No Contacts Avaliable"}
    </div>
    </div>
);
}
export default  ContactList;