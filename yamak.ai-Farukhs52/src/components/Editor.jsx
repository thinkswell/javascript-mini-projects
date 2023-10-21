import React, { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const modules = {
    toolbar: [
        ["bold"], ["italic"], ["underline"], ["strike"], ["link"]

    ]
}


const Editor = () => {

    const [contentLength, setContentLength] = useState("0");
    const handleChange = () => {
        setContentLength("  " + document.getElementsByClassName("ql-editor")[0].innerText.length);
        console.log(contentLength);
    }

    
    return (
        <div className="editor mb-5 col-lg-7 col-11">
            <h6 className="fw-bold">Enter input to get <span className="text-primary">Writing Assistant</span></h6>
            <ul className="flex editor-options my-4">
                <li>Words count: <input disabled placeholder={contentLength} /></li>
                <li>Prompt: <input /></li>
                <li>Creativity: <input /></li>
            </ul>
            <div >
                <ReactQuill modules={modules} theme="snow" onChange={handleChange} className="type-ground" placeholder="Content goes here..." />
            </div>
        </div>
    );
}

export default Editor;