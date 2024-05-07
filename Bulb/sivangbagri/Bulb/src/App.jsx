import { useState } from 'react';
import './App.css';

// SVG for the bulb icon
// eslint-disable-next-line react/prop-types
const BulbIcon = ({ isOn }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={isOn ? 'yellow' : 'gray'}
    width="50px"
    height="50px"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 18h2v2h-2v-2zm1-15a5.9 5.9 0 0 1 3.87 1.46 1 1 0 0 1-.74 1.85A3.96 3.96 0 0 0 12 6a3.96 3.96 0 0 0-3.13 1.54 1 1 0 1 1-1.56-1.28A5.95 5.95 0 0 1 11 4zM12 8a1 1 0 0 1 1 1v3H11V9a1 1 0 0 1 1-1zm-2 9h4v2h-4v-2z" />
  </svg>
);

function App() {
  const [isToggleOn, setIsToggleOn] = useState(false);

  const handleToggle = () => {
    setIsToggleOn(!isToggleOn);
  };

  return (
    <div>
      <div>
        {/* Bulb Icon */}
        <BulbIcon isOn={isToggleOn} />
      </div>

      <div className="card">
        {/* Toggle Button */}
        <button onClick={handleToggle}>
          {isToggleOn ? 'Turn Off' : 'Turn On'} Toggle
        </button>
      </div>
    </div>
  );
}

export default App;
