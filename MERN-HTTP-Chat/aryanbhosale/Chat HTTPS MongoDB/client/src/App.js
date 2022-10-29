import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [posts, setPosts] = useState([]);

  const getChatApp = () => {
    axios.get("http://localhost:8080/api").then((response) => {
    const data = response.data; 
    setPosts(data);
    console.log("Data received.");
  }).catch((error) => {
    alert("Error retrieving data.");
  });
}

  useEffect(() => {
    const getChatApp = () => {
      axios.get("http://localhost:8080/api").then((response) => {
      const data = response.data; 
      setPosts(data);
      console.log("Data received.");
    }).catch((error) => {
      alert("Error retrieving data.");
    });
  }

  getChatApp();
  }, []);

  const displayMessage = (posts) => {
    if(!posts.length) {
      return null;
    }
    return posts.map((post, index) => (
      <div className='chat-app__display' key={index}>
        <h3>
          {post.name}
        </h3>
        <p>
          {post.body}
        </p>
      </div>
    ));
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }
  const handleBodyChange = (event) => {
    setBody(event.target.value);
  }

  const textEventObject = {
    name, body, posts
  }
  console.log("State : ", textEventObject);

  const handleSubmit = (event) => {

    event.preventDefault(); // prevents the page from refreshing after form submission

    const payload = {
      name : name,
      body : body
    }

      axios({
        url : 'http://localhost:8080/api/save', // API POST URL
        method : 'POST', 
        data : payload
      }).then(() => {
        console.log("Data has been sent to the server.");
        setBody('');
        getChatApp();
      }).catch((error) => {
        console.log("ERROR : ", error);
      });
  }

  return (
    <div className="App">
      <h1>World HTTP Chat</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-input'>
          <input type="text" name="name" value={name} onChange={handleNameChange} placeholder="Enter your name" />
        </div>
        <div className='form-input'>
          <textarea name="message" value={body} cols="30" rows="10" onChange={handleBodyChange} placeholder="Enter message"></textarea>
        </div>
        <button>Send</button>
      </form>
      <div className='chat-app'>
        {displayMessage(posts)}
      </div>
    </div>
    );
}

export default App;
