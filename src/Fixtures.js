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
		return (
			<div id="fixtures">
				<h2>Hralo sa</h2>
				<div className="scrollable">
					<table>
						<tbody>
							<tr>
								<th className="center-text">Dátum</th>
								<th>Domáci</th>
								<th>Hosťia</th>
								<th className="center-text">Skóre</th>
							</tr>
								{this.state.fx.map(row => {
									return (
									<tr key={row.time} className="played-match">
										<td className="center-text">{row.time}</td>
										<td>{row.home_team}</td>
										<td>{row.away_team}</td>
										<td className="center-text">{row.score}</td>
									</tr>
									)
								})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}