import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'
import './App.css';

import Countdown from './Countdown'
import Schedule from './Schedule'
import Fixtures from './Fixtures'

export default class App extends Component {
  	render() {
    	return (
      		<div className="App">
			  	<Container fluid="true">
					<Row>
						<Col xs={12} md={4} lg={6}>
        					<Countdown />
						</Col>	
						<Col xs={12} md={4} lg={3}>
        					<Schedule />
						</Col>	
						<Col xs={12} md={4} lg={3}>
        					<Fixtures />
						</Col>	
					</Row>  
				</Container>
      		</div>
    	);
  	}
}
