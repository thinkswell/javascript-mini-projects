import React from "react";

const Footer = () => {
    return (
        <footer
            style={{
                width: "100vw",
                backgroundColor: "#a0aec0",
                textAlign: "center",
                position: "absolute",
                bottom: "0",
            }}
            className="ui vertical footer segment"
        >
            &copy; Copyright 2020
            <span style={{ marginLeft: "1%" }}>Evan Merzon</span>
            <span style={{ marginLeft: "1%" }}>
                <a href="https://github.com/emerzon1" class="ui animated button" tabindex="0">
                    <div
                        class="visible content"
                    >
                        Github <i className="github icon"></i>
                    </div>
                    <div
                        class="hidden content"
                    >
                        emerzon1
                    </div>
                </a>
            </span>
        </footer>
    );
};

export default Footer;
