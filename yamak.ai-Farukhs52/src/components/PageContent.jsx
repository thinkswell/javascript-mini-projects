import React  from "react";
import 'react-quill/dist/quill.snow.css';
import Cards from "./Cards";
import Editor from "./Editor";



const PageContent = () => {

    return (
        <div className="page-content px-5" >
            <div className="flex my-5 fw-bolder"><span className="fs-4">Home/Writing Assistant </span>
                <div className="ms-auto save-filter mt-3">
                    <button className="btn btn-primary  px-5  mx-3">Save</button><button className="btn btn-primary  px-5 px-5" >Filter</button>
                </div>
            </div>

            <div className="flex my-5 editor-cards">
            <Editor/>
                
                <div className="vr vr-middle"></div>
                <Cards/>
            </div>

        </div>
    );
}




export default PageContent;