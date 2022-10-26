import { useState } from 'react';
import './App.css';

function App() {

  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [guessedNumber, setGuessedNumber] = useState(false);
  const [inputNumber, setInputNumber] = useState(50);
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const number = parseInt(e?.target?.[0]?.value) ?? 0;
    setGuessedNumber(number);
  };

  const handleRetryClick = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1) ;
    setGuessedNumber(false);
    setInputNumber(50);
  };

  const isGuessCorrect = guessedNumber === randomNumber;
  const isGuessHigh = !!guessedNumber && guessedNumber > randomNumber;
  const isGuessLow = !!guessedNumber && guessedNumber < randomNumber;
  
  return (
    <div className='layout'>
      <h1>Number Guessing Game</h1>
      <form className='formWrapper' onSubmit={handleSubmit}>
        <div className='guessNumberWrapper'>Your guess: {inputNumber}<br/></div>
        <input
          className='rangeInput' 
          type="range" 
          id="number" 
          name="number" 
          min="1" 
          max="100" 
          value={inputNumber} 
          onChange={e => setInputNumber(e.target.value)}
        />
        <div className='row'>
          <input className='button' value="Guess" type="submit" />
          { 
            isGuessCorrect && (
              <button 
                className='button' 
                onClick={() => handleRetryClick()}
              > 
                Retry 
              </button> 
            )
          }
        </div>
      </form>
      { isGuessCorrect && 'Your guess is correct!'}
      { isGuessHigh && 'Your guess is too high.'}
      { isGuessLow && 'Your guess is too low.'}
    </div>
  );
}

export default App;
