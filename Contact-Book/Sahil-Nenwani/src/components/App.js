import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import api from '../api/contacts'
import Header from "./Header";
import AddContact from "./AddContacts";
import ContactList from "./ContactList";
import "bootstrap/dist/css/bootstrap.min.css";
import { uuid } from "uuidv4";
import contactDetail from "./contactDetail";
import EditContacts from "./EditContacts";

function App() {
  const LoCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([
    {
      id: "1",
      name: "Sahil",
      email: "sk@gmail.com",
    },
    {
      id: "2",
      name: "Sharoz",
      email: "Sharoz@gmail.com",
    },
  ]);
  const [SearchTerm,setSearchTerm] = useState("");
  const [searchResults,setsearchResults]=useState([])
  // const retriveContacts=async ()=>{
  //   const response= await api.get("/contacts")
  //   return response;
  // }
  const addConatctHandler = (contact) => {
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };
  const updateConatctHandler = (getcontact) => {
    const { id } = getcontact;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...getcontact } : contact;
      })
    );
  };
  useEffect(() => {
    localStorage.setItem(LoCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const retrivecontact = JSON.parse(localStorage.getItem(LoCAL_STORAGE_KEY));
    if (retrivecontact) setContacts(retrivecontact);
    // const getallcontacts= async () =>{
    // const allcontacts =await retriveContacts();
    // if(allcontacts) setContacts(allcontacts)

    // }
    // getallcontacts();
  }, []);
const searchHandler=(searchTerm)=> {
  
  setSearchTerm(searchTerm);
  if (searchTerm !== "") {
    const newConatactList=contacts.filter((contact)=>{
      return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    });
    setsearchResults(newConatactList)
    
  }
  else{
    setsearchResults(contacts)
  }
}
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };
  return (
    // className="ui container"
    <div>
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <ContactList
                {...props}
                getcontacts={SearchTerm <1 ? contacts : searchResults}
                getConatctid={removeContactHandler}
              term={SearchTerm}
              searchKeyword={searchHandler}
              />
            )}
          />
          <Route
            path="/add"
            render={(props) => (
              <AddContact {...props} addConatctHandler={addConatctHandler} />
            )}
          />
          <Route
            path="/edit"
            render={(props) => (
              <EditContacts
                {...props}
                updateConatctHandler={updateConatctHandler}
              />
            )}
          />
          <Route path="/contact/:id" component={contactDetail} />
        </Switch>
        {/* render={(props)=> <contactDetail {...props}/>} */}
        {/* <AddContact addConatctHandler={addConatctHandler}/>
     <ContactList contacts={contacts} getConatctid={removeContactHandler}/>  */}
      </Router>
    </div>
  );
}

export default App;
