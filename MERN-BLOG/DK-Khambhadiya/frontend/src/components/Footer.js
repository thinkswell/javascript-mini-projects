import React from "react";

const Footer = () => (
    <footer>
        Created by <span id="rajat">Rajat</span>
        <br />
        <span>
            <i
                className="fab fa-github"
                onClick={() =>
                    window.open("https://github.com/Rajatm544", "_blank")
                }
            ></i>{" "}
            <i
                className="fab fa-hackerrank"
                onClick={() =>
                    window.open("https://www.hackerrank.com/Rajat_M", "_blank")
                }
            ></i>{" "}
            <i
                className="fab fa-linkedin"
                onClick={() =>
                    window.open(
                        "https://www.linkedin.com/in/rajat--m",
                        "_blank"
                    )
                }
            ></i>{" "}
            <i
                className="fab fa-stack-overflow"
                onClick={() =>
                    window.open(
                        "https://stackoverflow.com/users/13040278/rajat-m",
                        "_blank"
                    )
                }
            ></i>{" "}
            <i
                className="fab fa-twitter"
                onClick={() =>
                    window.open("https://twitter.com/Rajat__m", "_blank")
                }
            ></i>
        </span>
    </footer>
);

export default Footer;
