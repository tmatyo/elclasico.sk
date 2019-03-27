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
		this.setState({fx:fx});
	}

	render() {
		console.log("Fixtures: ", this.state.fx);
		return (
			<div id="fixtures">
				<h2>Fixtures</h2>
				<table>
					<tbody>
						<tr>
							<th>Dátum</th>
							<th>Domáci</th>
							<th>Hosťia</th>
							<th>Skóre</th>
						</tr>
						{this.state.fx.map(row => {
							return (
							<tr key={row.time} className="played-match">
								<td>{row.time}</td>
								<td>{row.home_team}</td>
								<td>{row.away_team}</td>
								<td>{row.score}</td>
							</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		);
	}
}