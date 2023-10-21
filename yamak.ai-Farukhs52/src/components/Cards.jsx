import React from "react";

const Cards =()=>{
    return(
        <div className="card col-lg-4 col-12">
                    <button className="btn btn-primary ">Write for me</button>
                    <ul className="list-group list-group-flush pt-5">
                        <li className="list-group-item flex"  ><button type="button"
                            onClick={() => {
                                var copyText = document.getElementById("clip-board1");
                                console.log(copyText.innerText);
                                navigator.clipboard.writeText(copyText.innerText);
                                document.getElementById("clip-board01").title = "copied";
                                console.log(document.getElementById("clip-board01").title);
                            }}
                            data-bs-toggle="tooltip" id="clip-board01" data-bs-placement="top" title="Copy Text" className="btn btn-light btn-outline-light"
                        >Copy</button>
                            <div className="vr mx-3"></div><h6 type="text" id="clip-board1"> As artificial intelligence continues to evolve, it is becoming increasingly capable of generating original and insightful content. This blog post is a prime example; the title was
                            </h6></li>

                        <li className="list-group-item flex"><button onClick={() => {
                            var copyText = document.getElementById("clip-board2");
                            console.log(copyText.innerText);
                            navigator.clipboard.writeText(copyText.innerText);
                            document.getElementById("clip-board02").title = "copied";
                            console.log(document.getElementById("clip-board02").title);
                        }}
                            data-bs-toggle="tooltip" id="clip-board02" data-bs-placement="top" title="Copy Text" className="btn btn-light btn-outline-light "
                        >Copy</button>
                            <div className="vr mx-3"></div><h6 type="text" id="clip-board2">As artificial intelligence continues to evolve, it is becoming increasingly capable of generating original and insightful content. This blog post is a prime example; the title was
                            </h6></li>
                        <li className="list-group-item flex"><button onClick={() => {
                            var copyText = document.getElementById("clip-board3");
                            console.log(copyText.innerText);
                            navigator.clipboard.writeText(copyText.innerText);
                            document.getElementById("clip-board03").title = "copied";
                            console.log(document.getElementById("clip-board03").title);
                        }}
                            data-bs-toggle="tooltip" id="clip-board03" data-bs-placement="top" title="Copy Text" className="btn btn-light btn-outline-light"
                        >Copy</button>
                            <div className="vr mx-3"></div><h6 type="text" id="clip-board3">As artificial intelligence continues to evolve, it is becoming increasingly capable of generating original and insightful content. This blog post is a prime example; the title was
                            </h6></li>
                        <li className="list-group-item flex"><button onClick={() => {
                            var copyText = document.getElementById("clip-board4");
                            console.log(copyText.innerText);
                            navigator.clipboard.writeText(copyText.innerText);
                            document.getElementById("clip-board04").title = "copied";
                            console.log(document.getElementById("clip-board04").title);
                        }}
                            data-bs-toggle="tooltip" id="clip-board04" data-bs-placement="top" title="Copy Text" className="btn btn-light btn-outline-light"
                        >Copy</button>
                            <div className="vr mx-3"></div><h6 type="text" id="clip-board4">As artificial intelligence continues to evolve, it is becoming increasingly capable of generating original and insightful content. This blog post is a prime example; the title was
                            </h6></li>
                    </ul>
                </div>
    )
}

export default Cards;