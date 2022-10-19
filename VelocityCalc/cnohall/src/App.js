import { useState } from 'react';
import './App.css';

function App() {

  const [initialVelocity, setInitialVelocity] = useState(10);
  const [initialVelocityUnit, setInitialVelocityUnit] = useState('1');
  const [acceleration, setAcceleration] = useState(10);
  const [accelerationUnit, setAccelerationUnit] = useState('1');
  const [time, setTime] = useState(10);
  const [timeUnit, setTimeUnit] = useState('1');
  const [velocityAfterTimePassed, setVelocityAfterTimePassed] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const standardizedVelocity = initialVelocityUnit === '2' 
      ? initialVelocity / 3.6 
      : initialVelocity;
    const standardizedAcceleration = accelerationUnit === '2' 
      ? acceleration * 1000
      : acceleration;
    const standardizedTime = timeUnit === '2' 
      ? time * 3600 
      : time;
    setVelocityAfterTimePassed(parseInt(standardizedVelocity) + (standardizedAcceleration * standardizedTime));
  };

  const renderInitialVelocityInput = () => (
    <div className='row'>
      <label className='label'>Initial Velocity</label>
      <input
        className='input'
        type='number' 
        id='initialVelocity' 
        name='initialVelocity' 
        value={initialVelocity} 
        onChange={e => setInitialVelocity(e.target.value)}
      />

      <select 
        className='selectInput' 
        id='initialVelocityUnit' 
        name='initialVelocityUnit' 
        size='2' 
        onChange={e => setInitialVelocityUnit(e.target.value)}
      >
        <option value={1} selected="selected">m/s</option>
        <option value={2}>km/h</option>
      </select>
    </div>
  );

  const renderAccelerationInput = () => (
    <div className='row'>
      <label className='label'>Acceleration</label>
      <input
        className='input'
        type='number' 
        id='acceleration' 
        name='acceleration' 
        value={acceleration} 
        onChange={e => setAcceleration(e.target.value)}
      />

      <select 
        className='selectInput' 
        id='accelerationUnit' 
        name='accelerationUnit' 
        size='2'
        onChange={e => setAccelerationUnit(e.target.value)}
      >
        <option value={1} selected="selected">m/s²</option>
        <option value={2}>km/s²</option>
      </select>
    </div>
  );

  const renderTimeInput = () => (
    <div className='row'>
      <label className='label'>Time</label>
      <input
        className='input'
        type='number' 
        id='time' 
        name='time' 
        value={time} 
        onChange={e => setTime(e.target.value)}
      />

      <select 
        className='selectInput' 
        id='timeUnit' 
        name='timeUnit' 
        size='2'
        onChange={e => setTimeUnit(e.target.value)}
      >
        <option value={1} selected="selected">sec</option>
        <option value={2}>hour</option>
      </select>
    </div>
  );
  
  return (
    <div className='layout'>
      <h1>Velocity Calculator</h1>
      <form className='formWrapper' onSubmit={handleSubmit}>

        {renderInitialVelocityInput()}
        {renderAccelerationInput()}
        {renderTimeInput()}

        <input className='button' value='Submit' type='submit' />
      </form>
      {velocityAfterTimePassed && `The velocity after the time has passed: ${velocityAfterTimePassed}m/s`}
    </div>
  );
}

export default App;
