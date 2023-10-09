// NewsList.js
import React from 'react';
import NewsItem from './NewsItem';

function NewsList({ news }) {
  return (
    <div className="news-list">
      {news.map((article, index) => (
        <NewsItem key={index} article={article} />
      ))}
    </div>
  );
}

export default NewsList;
