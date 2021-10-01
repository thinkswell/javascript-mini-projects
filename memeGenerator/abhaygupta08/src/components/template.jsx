// import React, { useState, useEffect } from "react";

const Templates = ({templates,setMeme}) => {
    return(
        <>

                <h1><u>MEME GENERATOR</u></h1>
                <br></br>

            <div className="templates">
                {
                    templates.map(template => {
                        return (<>
                            <div key={template.id} className="template"  onClick= {() => setMeme(template)}>
                                <div className="memeName"><h3>{template.name}</h3></div>
                                <div className="image" style={{ background: `url('${template.url}')`, backgroundSize: "cover",backgroundPosition:"center" }}></div>
                            </div>
                        </>)
                    })
                }
            </div>
        </>
    )
}
export default Templates;