import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Spinner from './Spinner';
import NewsCard from './NewsCard';

const Search = () => {
    const [articles, setarticles] = useState([])
    const [query, setquery] = useState("")

    useSelector(state => state.search).then(data => {
        setarticles(data.articles)
        setquery(data.query)
    });
    document.title = `${query} - News Wallah`

    const renderNews = () => {
        return articles.map((e) => {
            if (e.title === "" || e.abstract === "" || e.section === "admin") {
                return "";
            }
            else {
                let imgUrl;
                if (e.multimedia != null) {
                    for (let i = 0; i < e.multimedia.length; i++) {
                        if (i === 1) {
                            imgUrl = `https://nytimes.com/${e.multimedia[i].url}`;
                        }
                    }
                }
                let formattedDate = new Date(e.pub_date).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: 'America/New_York'
                });
                return (
                    <div className='col-md-4' style={{ padding: '10px' }} key={e.uri}>
                        <NewsCard title={e.headline.main} abstract={e.abstract} newsUrl={e.web_url} author={e.byline.original} date={formattedDate} imgUrl={imgUrl} />
                    </div>
                );
            }
        })
    }

    return (
        <>
            {articles.length === 0 ? <Spinner /> :
                <div className="container my-3" style={{ padding: "4rem" }}>
                    <h2 id="heading" className="text-center">News Wallah - Search:  {query}</h2>
                    <div className="row my-3" key={Math.random() + 1}>
                        {renderNews()}
                    </div>
                </div>
            }
        </>
    )
}

export default Search
