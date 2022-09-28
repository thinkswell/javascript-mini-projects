import React from "react";
import { Link } from "react-router-dom";

const Landing = () => (
    <div className="jumbotron">
        <h1 className="display-4">
            Just Blog It<span className="full-stop">.</span>
        </h1>
        <main>
            This is a blogging platform for all your blogging needs!
            <br />
            Want to read some awesome blogs? We've got you covered!
            <br /> Want to write an awesome blog post?
            <br /> Rest assured, because we've got you covered once again!
        </main>
        <hr className="my-4 gold-hr" />
        <p>So, click below and dive right in!</p>
        <Link
            className="btn btn-outline-primary btn-lg"
            to="/posts"
            role="button"
        >
            Show Blog Posts
        </Link>
    </div>
);

export default Landing;
