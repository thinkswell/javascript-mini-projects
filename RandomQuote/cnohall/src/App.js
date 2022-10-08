import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [quote, setQuote] = useState('Loading...');
  const [author, setAuthor] = useState('Unknown');
  const [isLoading, setIsLoading] = useState(true);
  const fiveMinutesInMS = 300000;
  let timer = null;

  const fetchQuote = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data?.content);
      setAuthor(data?.author);
    } catch (error) {
      setQuote('Sorry, something went wrong.');
    }
    setIsLoading(false);
    clearTimeout(timer);
    timer = setTimeout(() => fetchQuote(), fiveMinutesInMS);
  };


  useEffect(() => {
    fetchQuote();
  }, [])

  const renderQuote = () => (
    <><q>{quote}</q><br/>-{author}<br/></>
  );
  
  return (
    <div className='layout'>
      <h1>Random Quote Generator</h1>
      {isLoading ? <div className='loader' /> : renderQuote()}
      <button className='button' onClick={() => fetchQuote()}>Fetch new quote</button>
    </div>
  );
}

export default App;
