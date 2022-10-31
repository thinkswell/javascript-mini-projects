import React, { useState } from 'react';
import Modal from './Modal';

function Footer() {
    const [modal,setModal] = useState(false);
    function toggle(){
        setModal(!modal);
    }


    return (
        <div className='footer'>
            <div class="attribution">
                <span>Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a target="_blank" href="https://github.com/MAX-786">Mohammad Hussain</a>.</span>
            </div>
            
            <button onClick={toggle} >RULES</button>
            {modal && <Modal toggle={toggle} />}
        </div>
    );
}


export default Footer;