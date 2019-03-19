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
						<tr>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default Schedule;