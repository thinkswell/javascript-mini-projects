import React, { useState, useEffect } from 'react'
import NewsCard from './NewsCard'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroller';

function TopStories(props) {
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [articleEnd, setArticleEnd] = useState(6)
    const [section, setSection] = useState("Home")

    const handleNextClick = () => {
        if (page < Math.ceil(articles.length / 6)) {
            setPage(page + 1)
            setArticleEnd(articleEnd + 6)
            renderNews(0, articleEnd)
        }
    }

    const renderNews = (start, end) => {
        return articles.slice(start, end).map((e) => {
            if (e.title === "" || e.abstract === "" || e.section === "admin") {
                return "";
            }
            else {
                let imgUrl;
                if (e.multimedia != null) {
                    for (let i = 0; i < e.multimedia.length; i++) {
                        if (i === 1) {
                            imgUrl = e.multimedia[i].url;
                        }
                    }
                }
                let formattedDate = new Date(e.published_date).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    timeZone: 'America/New_York'
                });
                return (
                    <div className='col-md-4' style={{ padding: '10px' }} key={e.uri}>
                        <NewsCard title={e.title} abstract={e.abstract} newsUrl={e.short_url} imgUrl={imgUrl} author={e.byline} date={formattedDate} />
                    </div>
                );
            }
        });
    }

    useEffect(() => {
        document.title = `${props.section === "home" ? '' : section} Headlines - News Wallah`
        async function fetchData() {
            try {
                let url = `https://api.nytimes.com/svc/topstories/v2/${props.section}.json?api-key=${props.apiKey}`;
                let data = await fetch(url);
                let parsedData = await data.json()
                setArticles(parsedData.results)
                setSection(parsedData.section)
                document.title = `News Wallah - ${props.section === "home" ? '' : section} Headlines`
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [props.apiKey, props.section, section]);


    return (
        <>
            {articles.length === 0 ? <Spinner /> :
                <div className="container my-3" style={{ padding: "4rem" }}>
                    <h2 id="heading" className="text-center">News Wallah - {props.section === "home" ? '' : section} Headlines</h2>
                    {
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={handleNextClick}
                            hasMore={Math.ceil(articles.length / 6) === page ? false : true}
                            loader={<Spinner key={Math.floor(Math.random() * 51)} />}
                            threshold={-10}
                        >
                            <div className="row my-3" key={Math.random() + 1}>
                                {renderNews(0, articleEnd)}
                            </div>
                        </InfiniteScroll>
                    }
                </div>}
        </>
    )
}

export default TopStories
