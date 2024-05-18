import React, { Component } from "react";
import "../css/Fixtures.css";

export default class Fixtures extends Component {
	constructor() {
		super();
		this.state = {
			fx: [],
		};
	}

	componentDidMount() {
		//this.setState({fx:fx});
		let v = new Date();
		fetch("/fixtures.json?v=" + v.getTime())
			.then((res) => res.json())
			.then((res) => this.setState({ fx: res }))
			.catch((error) => console.log("ERROR:", error));
	}

	goTo(link) {
		window.open(link, "noopener");

		this.goTo = this.goTo.bind(this);
	}

	render() {
		return (
			<div id="fixtures">
				<h2>Hralo sa</h2>
				<div className="timeline">
					{this.state.fx.map((row, index) => {
						return (
							<div
								key={index}
								className={"timeline-item " + row.winner + (index % 2 ? " even" : " odd")}
								title={row.event}
							>
								<div className={index % 2 ? "even-line" : ""}>
									{index % 2 ? <span className="time">{row.time}</span> : ""}
								</div>
								<div
									className={"timeline-fixture " + (index % 2 ? "even" : "odd")}
									onClick={() => this.goTo(row.link)}
								>
									<span>{row.home_team}</span> <span>{row.score}</span> <span>{row.away_team}</span>
								</div>
								<div className={index % 2 ? "" : "odd-line"}>
									{index % 2 ? "" : <span className="time">{row.time}</span>}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}
