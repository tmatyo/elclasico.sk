import React, { Component } from "react";
import "../css/Schedule.css";

import sc from "./schedule.json";

export default class Schedule extends Component {
	constructor() {
		super();
		this.state = {
			sc: [],
		};
	}

	componentDidMount() {
		this.setState({ sc: sc });
	}

	render() {
		return (
			<div id="schedules">
				<h2>Bude sa hrať</h2>
				<table>
					<tbody>
						<tr>
							<th className="center-text">Dátum</th>
							<th>Domáci</th>
							<th>Hosťia</th>
						</tr>
						{this.state.sc.map((row) => {
							return (
								<tr key={row.time} className="upcoming-match">
									<td className="center-text">{row.time}</td>
									<td>{row.home_team}</td>
									<td>{row.away_team}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	}
}
