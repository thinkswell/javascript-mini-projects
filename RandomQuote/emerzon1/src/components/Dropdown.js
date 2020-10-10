import React from "react";

const Dropdown = ({ onDropdownChange }) => {
    return (
        <div>
            <div
                className="ui right pointing label"
            >
                Please select a quote category
            </div>
            <select
                name="Quotes"
                className="ui dropdown"
                onChange={(curr) => {
                    onDropdownChange(curr.target.value);
                }}
            >
                <option value="" selected>
                    Random
                </option>
                <option value="famous-quotes">Famous quotes</option>
                {[
                    "politics",
                    "science",
                    "technology",
                    "wisdom",
                    "life",
                    "inspirational",
                    "history",
                    "friendship",
                ].map((v) => (
                    <option value={v}>
                        {v.substring(0, 1).toUpperCase() + v.substring(1)}
                    </option>
                ))}
            </select>
            <hr />
        </div>
    );
};

export default Dropdown;
