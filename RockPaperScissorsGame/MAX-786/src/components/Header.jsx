import React from 'react';


function Header({score}) {
    return (
        <div className='header'>
            <div className="header__titles">
                <span>ROCK</span>
                <span>PAPER</span>
                <span>SCISSORS</span>
            </div>
            <div className="header__score">
                <span>SCORE</span>
                <h1>{score}</h1>
            </div>
        </div>
    );
}


export default Header;