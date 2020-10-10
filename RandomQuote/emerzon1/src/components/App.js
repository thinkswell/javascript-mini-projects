import React, { useState } from "react";
import Footer from "./Footer";
import Quote from "./Quote";
import Header from "./Header";
import Dropdown from "./Dropdown";

const App = () => {
    const [category, setCategory] = useState("");
    const [quote, setQuote] = useState(0);
    return (
        <div>
            <div style={{ marginTop: "2%" }} className="ui container">
                <Header />
                <br />
                <Dropdown
                    onDropdownChange={(val) => {
                        setCategory(val);
                        setQuote(quote + 1);
                    }}
                />
                <br />
                <Quote category={category} newQuote={quote} />
                <br />
                <button
                    class="ui right labeled icon button"
                    onClick={() => setQuote(quote + 1)}
                >
                    <i class="right arrow icon"></i>
                    Next Quote
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default App;
