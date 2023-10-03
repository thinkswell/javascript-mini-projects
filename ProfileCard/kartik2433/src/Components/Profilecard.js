import React from 'react';
import './Profilecard.css'
// import ReactDOM from 'react-dom/client';

function Profilecard({Obj,BgColor}){
  function uppercase ( word ) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
    console.log(Obj.picture);
    return(
                <div className="card-body"style={{backgroundColor : BgColor}}>
                  <div className="avatar">
                    <img
                      src={Obj.picture.large}
                      className="card-img-top"
                      alt=""
                    />
                  </div>
                  <h5 className="card-title">
                    {Obj.name.first + " " + Obj.name.last}
                  </h5>
                  <p className="card-text">
                    { Obj.location.city +
                      ", " +
                      Obj.location.state + 
                      ", " +
                      Obj.location.country+
                      ", " + 
                      Obj.location.postcode}
                    <br />
                    <span className="phone">{Obj.phone}</span>
                  </p>
                </div>
    );
}

export default Profilecard;

/* 

*/