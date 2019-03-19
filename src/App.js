import React, { Component } from 'react';
import './App.css';

import Countdown from './Countdown'
import Schedule from './Schedule'
import Fixtures from './Fixtures'

class App extends Component {
  	render() {
    	return (
      		<div className="App">
        		<Countdown />
        		<Schedule />
        		<Fixtures />
      		</div>
    	);
  	}
}

export default App;
