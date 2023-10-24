import React, { useState } from "react";
import { skillCheck } from "../../Career/careerHandler";
import { ClassicCharacterCreation } from "./ClassicCharacterCreation";
import { Link } from "react-router-dom";

const classicStats: StatDisplayHolder = {
	str: 0,
	dex: 0,
	end: 0,
	int: 0,
	edu: 0,
	soc: 0,
}

export const ClassicContainer = () => {
	const statRolls = Array.from({ length: 6 }, () => skillCheck());
	const [availableStats, setAvailableStats] = useState([
		"Strength",
		"Dexterity",
		"Endurance",
		"Intelligence",
		"Education",
		"Social Standing",
	]);
	const [statArray, setStatArray] = useState(statRolls);
	const [currentStats, setCurrentStats] = useState(classicStats);

	const handleClick = (eventKey: string | null, num: number): void => {
		if (eventKey === null) {
			console.error("eventKey is null");
			return;
		}
		setAvailableStats(availableStats.filter((e) => e !== eventKey));
		const temp = statArray;
		const index = statArray.indexOf(num);
		temp.splice(index, 1);
		setStatArray(temp);
		setCurrentStats((prevStats) => {
			return { ...prevStats, [eventKey]: num };
		});
		return;
	};
	const currentStatArray = Object.keys(currentStats);
	const getModifiers = (num :number | undefined): number => {
		if (num === undefined) {
			console.error("Get Modifiers called with undefined value");
			return 0;
		}
		if (num === 0) {
			return -3;
		} else if (num === 1 || num === 2) {
			return -2;
		} else if (num >= 3 && num < 6) {
			return -1;
		} else if (num > 5 && num < 9) {
			return 0;
		} else if (num > 8 && num < 12) {
			return 1;
		} else if (num > 11 && num < 15) {
			return 2;
		} else {
			return 3;
		}
	};
	return (
		<div>
			<ClassicCharacterCreation
				statArray={statArray}
				availableStats={availableStats}
				clickHandler={handleClick}
				modifier={getModifiers}
			/>
			{currentStatArray.map((e: string, i) => {
				return (
					<p key={i}>
						{e}: {currentStats[e as keyof StatDisplayHolder]} (
						{getModifiers(
							currentStats[e as keyof StatDisplayHolder]
						)}
						)
					</p>
				);
			})}
			<Link to="/creation/background_skills">Next</Link>
		</div>
	);
};
