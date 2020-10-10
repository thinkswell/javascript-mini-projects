import React, { useEffect, useState } from "react";

const Quote = ({ category, newQuote }) => {
    const [quote, setQuote] = useState(null);
    useEffect(() => {
        setQuote(null);
        fetch(`https://api.quotable.io/random?tags=${category}`)
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setQuote(res);
            });
    }, [newQuote]);
    if (quote) {
        return (
            <div className="ui segment">
                {quote.content}
                <p>- {quote.author}</p>
            </div>
        );
    }
    return (
        <div className="ui icon message">
            <i className="notched circle loading icon"></i>
            <div className="content">
                <div className="header">Just one second</div>
                <p>We're fetching that content for you.</p>
            </div>
        </div>
    );
};

export default Quote;
