import React, { useState } from 'react'

const Footer = () => {

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const a = {
        color: "#000000",
        textDecoration: isHover ? 'underline' : 'none'
    }
    return (
        <div style={{ color: '#000000' }} className="text-center">Made with ❤️ by <a href="https://ankanroy.in" target="_blank" rel="noreferrer" style={a} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Ash V</a></div>
    )
}

export default Footer