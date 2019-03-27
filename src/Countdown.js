import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import './Countdown.css';

export default class Countdown extends Component{
	render() {
		return (
			<div id="countdown">
				<h1>Nasledujúce El Clasico</h1>	
				<Container>
					<Row>
						<Col xs={12}>
							<div className="cd-grid">
								<div className="cd-cell">
									<div className="cd-number">12</div>
									<div className="cd-desc">Dní</div>
								</div>
								<div className="cd-cell">
									<div className="cd-number">13</div>
									<div className="cd-desc">Hodín</div>
								</div>
								<div className="cd-cell">
									<div className="cd-number">14</div>
									<div className="cd-desc">Minút</div>
								</div>
								<div className="cd-cell">
									<div className="cd-number">15</div>
									<div className="cd-desc">Sekúnd</div>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}