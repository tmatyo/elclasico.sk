import React, { Component } from 'react';
import './Fixtures.css';

import fx from './fixtures.json';

export default class Fixtures extends Component {
	constructor() {
		super();
		this.state = {
			fx: []
		};
	}

	componentDidMount() {
		this.setState({fx:fx});console.log(fx);
	}

	render() {
		return (
			<div id="fixtures">
				<h2>Hralo sa</h2>
				<div className="timeline">
					{this.state.fx.map((row, index) => {
						return (
							<div key={index} className={"timeline-item " + row.winner} >
								<div className={index % 2 ? "even-line" : ""}>
									{index % 2 ? <span className="time">{row.time}</span> : ''}
								</div>
								<div className={"timeline-fixture " + (index % 2 ? "even" : "odd")} >
									<span>{row.home_team}</span> <span>{row.score}</span> <span>{row.away_team}</span>
								</div>
								<div className={index % 2 ? "" : "odd-line"}>
									{index % 2 ? '' : <span className="time">{row.time}</span>}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		);
	}
}