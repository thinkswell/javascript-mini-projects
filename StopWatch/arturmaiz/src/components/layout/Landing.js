import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.scss';

const Landing = props => {
	return (
		<div className="landing-wrapper">
			<h1>stop watch</h1>
			<img src="/logo192.png" alt="stop watch" />
			<Link className="exercise-btn" to="/start">
				start
			</Link>
		</div>
	);
};

export default Landing;
