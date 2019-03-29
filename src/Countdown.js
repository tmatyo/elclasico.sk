import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap'
import './Countdown.css';
import sc from './schedule.json';

export default class Countdown extends Component{
	constructor() {
		super();
		this.state = {
			sc: [], days: 0, hours: 0, minutes: 0, seconds: 0
		};
	}

	componentDidMount() {
		this.setState({sc:sc});

		var t = setInterval(() => {
			let from = new Date();
			let date = this.state.sc[0].time.replace(" ", "");
			date = date.replace(":", ".");
			date = date.split(".");

			let to = new Date(from.getFullYear(), date[1] - 1, date[0], date[2], date[3]);	
	
			this.startCountdown(from, to);
		}, 1000);		
	}

	startCountdown(from, to) {

		let cd = to - from;
		let days = 1000 * 60 * 60 * 24;
		let hours = 1000 * 60 * 60;
		let minutes = 1000 * 60;
		let seconds = 1000

		this.setState({
			days: Math.floor(cd / days),
			hours: Math.floor(cd % days / hours),
			minutes: Math.floor(cd % hours / minutes),
			seconds: Math.floor(cd % minutes / seconds)
		});

		console.log('FROM', from);
		console.log('TO', to);
		console.log(this.state.sc[0].time);
	}

	render() {
		return (
			<div id="countdown">
				<Container>
					<Row>
						<h1>Nasledujúce El Clasico</h1>
						<div className="cd-grid">
							<div className="cd-cell">
								<div className="cd-number">{this.state.days}</div>
								<div className="cd-desc">Dní</div>
							</div>
							<div className="cd-cell">
								<div className="cd-number">{this.state.hours}</div>
								<div className="cd-desc">Hodín</div>
							</div>
							<div className="cd-cell">
								<div className="cd-number">{this.state.minutes}</div>
								<div className="cd-desc">Minút</div>
							</div>
							<div className="cd-cell">
								<div className="cd-number">{this.state.seconds}</div>
								<div className="cd-desc">Sekúnd</div>
							</div>
						</div>
					</Row>
				</Container>
			</div>
		);
	}
}