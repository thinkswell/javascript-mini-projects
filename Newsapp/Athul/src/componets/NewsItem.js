import React from 'react'

const NewsItem = (props) => {

    let { title, description, imageUrl, newsUrl, authour, date, source } = props;
    return (
        <div>

            <div className="card" >
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: "0" }}>
                    <span className=" badge rounded-pill bg-danger" >
                        {source}
                    </span>
                </div>
                <img src={imageUrl ? imageUrl : 'https://i.ytimg.com/vi/LBQNI1hoEU8/maxresdefault.jpg'} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {authour ? authour : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-primary">Read more</a>
                </div>
            </div>
        </div>
    )
}

export default NewsItem
