import React, { Component } from 'react';
import './Schedule.css';

import sc from './schedule.json';

class Schedule extends Component {
	constructor() {
		super();
		this.state = {
			sc: []
		};
	}

	componentDidMount() {
		this.setState({sc:sc});
	}

	render(){
		console.log(this.state.sc);
		return (
			<div id="schedule">
				<h2>Schedule</h2>
				<table>
					<tbody>
						{this.state.sc.map(row => {
							return (
							<tr key="row.time" className="upcoming-match">
								<td>{row.time}</td>
								<td>{row.home_team}</td>
								<td>{row.away_team}</td>
							</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		);
	}
}

export default Schedule;