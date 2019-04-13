import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap'
import './Countdown.css';
// import sc from './schedule.json';
import real from './Real_Madrid_CF.svg'
import barca from './FC_Barcelona.svg'

export default class Countdown extends Component{
	constructor() {
		super();
		this.state = {
			days: 0, hours: 0, minutes: 0, seconds: 0, sc: [{
				home_team: "-",
				away_team: "-"
			}]
		};
	}

	componentDidMount() {
		// this.setState({sc:sc});
		fetch('/schedule.json').then(res => res.json()).then(res => this.setState({sc:res})).catch(error => console.log("ERROR:", error));

		var t = setInterval(() => {

			if(this.state.sc.length === 0) {
				return;
			}

			let from = new Date();
			let date = this.state.sc[0].time.replace(" ", "");
			date = date.replace(":", ".");
			date = date.split(".");

			let to = new Date(from.getFullYear(), date[1] - 1, date[0], date[2], date[3]);
			let cd = to - from;	
			
			if (cd < 0) {
				clearInterval(t);
				return;
			}
			
			this.startCountdown(cd);
		}, 1000);		
	}

	startCountdown(cd) {
		let days = 1000 * 60 * 60 * 24;
		let hours = 1000 * 60 * 60;
		let minutes = 1000 * 60;
		let seconds = 1000;
		
		this.setState({
			days: Math.floor(cd / days),
			hours: Math.floor(cd % days / hours),
			minutes: Math.floor(cd % hours / minutes),
			seconds: Math.floor(cd % minutes / seconds)
		});
	}

	render() {
		let banner = (<div className="banner-grid">
			<p>Nie je naplánované žiadne El clasico :(</p>
		</div>);
		if(this.state.sc.length > 0) {
			banner = (<div className="banner-grid">
				<div className="banner-home">
					<img width="300" src={this.state.sc[0].home_team === "Barcelona" ? barca : real} alt={this.state.sc[0].home_team} />
					<h2>{this.state.sc[0].home_team}</h2>
				</div>
				<div className="banner-vs">
					<h2>VS</h2>
				</div>
				<div className="banner-away">
					<img width="300" src={this.state.sc[0].home_team === "Barcelona" ? barca : real} alt={this.state.sc[0].away_team} />
					<h2>{this.state.sc[0].away_team}</h2>
				</div>
			</div>);
		}

		return (
			<div id="countdown">
				<Container>
					<Row>
						<h1>Nasledujúce El Clasico</h1>
						{banner}
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