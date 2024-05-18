import "../css/banner.css";
import real from "../svg/Real_Madrid_CF.svg";
import barca from "../svg/FC_Barcelona.svg";

export default function Banner({awayTeam, homeTeam, isPlanned}) {
	const getLogo = (team) => {
		return team.includes("Barcelona") ? barca : real;
	};

	const banner = isPlanned ? (
		<div className="banner">
			<div className="banner-home">
				<img height="300" src={getLogo(homeTeam)} alt={homeTeam} />
				<h2>{homeTeam}</h2>
			</div>
			<div className="banner-vs">
				<h2>VS</h2>
			</div>
			<div className="banner-away">
				<img height="300" src={getLogo(awayTeam)} alt={awayTeam} />
				<h2>{awayTeam}</h2>
			</div>
		</div>
	) : (
		<div className="banner">
			<p>Nie je naplánované žiadne El clasico :(</p>
		</div>
	);

	return banner;
}
