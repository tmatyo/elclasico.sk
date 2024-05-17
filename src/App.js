import React, { Component } from 'react';
import './css/App.css';

import Countdown from './components/Countdown'
import Fixtures from './components/Fixtures'

export default class App extends Component {
  	render() {
    	return (
      		<div id="app">
        		<Countdown />
        		<Fixtures />
      		</div>
    	);
  	}
}
