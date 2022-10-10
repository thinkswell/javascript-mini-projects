import React from 'react';
import Header from './components/Header/Header';
import './App.scss';
import Routes from './Routes';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="container">
          <Routes />
      </div>
    </div>
  )

}

export default App;
