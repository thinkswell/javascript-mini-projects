import React from 'react';
import ReactDOM from 'react-dom';
import close from "../images/icon-close.svg";
import rules from "../images/image-rules.svg";

function Modal({toggle}) {
    
    return ReactDOM.createPortal(
        <div className='modal-container' onClick={toggle}>
            <div className='modal-box'>
                <div className='modal-header'>
                    <span>RULES</span>
                    <button onClick={toggle}><img src={close} alt="close" /></button>
                </div>
                <img className='rules' src={rules} alt="rules" />

            </div>
        </div>,
        document.getElementById("modal")
    )
}


export default Modal;