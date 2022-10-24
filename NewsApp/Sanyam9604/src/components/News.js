import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  let defaultArticles = [
    {
      source: {
        id: null,
        name: null,
      },
      author: null,
      title:
        "MAX API CALL LIMIT HAS BEEN REACHED..PLS WAIT FOR SOME TIME TO RESTORE",
      description:
        "I am using a dev version from NewsApi, Which is a free version. So, It has a limit on api requests..",
      url: "https://newsapi.org/pricing",
      urlToImage:
        "https://th.bing.com/th/id/OIP.pHGb8ADBHAtrNtmxfkrLbgAAAA?w=159&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
      publishedAt: "2021-09-05T10:30:00Z",
      content: null,
    },
  ];

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalArticles, setTotalArticles] = useState(0);
  const [fetched, setFetched] = useState(false);

  const updatePage = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    // console.log("fetch",data.status);
    if (data.status < 400) {
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalArticles(parsedData.totalResults);
    }else{
      setArticles(defaultArticles);
      setTotalArticles(1);
    }
    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${
      props.category.charAt(0).toUpperCase() + props.category.slice(1)
    } - NewsMonkey`;
    updatePage();
    // eslint-disable-next-line
  }, []);

  const fetchData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    if (data.status < 400) {
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles));
      setTotalArticles(parsedData.totalResults);
      setPage(page + 1);
      setFetched(true);
    }else{
      setArticles(defaultArticles);
      setTotalArticles(1);
    }
  };

  return (
    <>
      <h2 className="text-center" style={{marginTop:'80px'}}>
        NewsMonkey - Top{" "}
        {props.category.charAt(0).toUpperCase() + props.category.slice(1)}{" "}
        Headlines
      </h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchData}
        hasMore={articles.length !== totalArticles}
        loader={<Spinner />}
        endMessage={ fetched &&
          <div className="card">
            <div className="card-body text-center">
              You've seen all the latest news till now!
            </div>
          </div>
        }
      >
        <div className="container">
          <div className="row my-3">
            {articles.map((e) => {
              return (
                <div
                  className="col-md-4"
                  style={{ margin: "0 auto" }}
                  key={e.url}
                >
                  <NewsItem
                    title={
                      e.title !== null
                        ? e.title.length <= 60
                          ? e.title
                          : e.title.slice(0, 60) + "..."
                        : ""
                    }
                    description={
                      e.description !== null
                        ? e.description.length <= 100
                          ? e.description
                          : e.description.slice(0, 100) + "..."
                        : ""
                    }
                    imgUrl={
                      e.urlToImage !== null
                        ? e.urlToImage
                        : "https://www.bing.com/th?id=OIP.tB7jk98a9oIohbIWLqwM5AHaEL&w=199&h=105&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
                    }
                    url={e.url}
                    author={e.author !== null ? e.author : "Unknown"}
                    date={e.publishedAt}
                    source={e.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;