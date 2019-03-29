import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Row, Col } from 'react-bootstrap'
import './App.css';

import Countdown from './Countdown'
// import Schedule from './Schedule'
import Fixtures from './Fixtures'

export default class App extends Component {
  	render() {
    	return (
      		<div id="app">
        		<Countdown />
        		{/* <Schedule /> */}
        		<Fixtures />
      		</div>
    	);
  	}
}
