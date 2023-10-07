// src/App.js
import React from 'react';
import './App.css';
import ProfileCard from '../src/Components/ProfileCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Random Profile Card Generator</h1>
        <ProfileCard />
      </header>
    </div>
  );
}

export default App;
