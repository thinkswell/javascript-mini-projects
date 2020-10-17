import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './layout/Landing';
import StopWatch from '../components/stopWatch/StopWatch';

const App = props => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Landing} />
				<Route exact path="/start" component={StopWatch} />
			</Switch>
		</Router>
	);
};

export default App;
