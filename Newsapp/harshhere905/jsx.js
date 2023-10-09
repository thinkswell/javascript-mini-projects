// App.js
import React, { useState, useEffect } from 'react';
import NewsList from './components/NewsList';
import './App.css';

const API_KEY = 'YOUR_NEWSAPI_KEY';
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

function App() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setNews(data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="App">
      <h1>React News App</h1>
      <NewsList news={news} />
    </div>
  );
}

export default App;
