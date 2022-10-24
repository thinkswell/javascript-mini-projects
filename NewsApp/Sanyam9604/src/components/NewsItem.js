import React from "react";

const NewsItem = ({title, description, imgUrl, url, author, date, source}) => {
    return (
      <div className="my-3">
        <div className="card">
          <img src={imgUrl} className="card-img-top" alt="..." style={{height:"250px"}} />
          <div className="card-body">
            <span className="badge rounded-pill bg-secondary my-2">{source}</span>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            
            <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
            <a href={url} target="_blank" rel="noreferrer" className="btn btn-sm btn-danger">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
}

export default NewsItem;
