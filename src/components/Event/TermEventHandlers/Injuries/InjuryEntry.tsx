import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import { roll } from "../../../../features/Career/careerHandler";
import genericTables from "../../genericTables";
import MediumInjury from "./MediumInjury";
import MildInjury from "./MildInjury";
import ModerateInjury from "./ModerateInjury";
import NoInjury from "./NoInjury";
import SevereInjury from "./SevereInjury";
import WorstInjury from "./WorstInjury";

const InjuryEntry = () => {
	const event = useSelector((state: RootState) => state.term.event);
	const [injury, setInjury] = useState({});
	const [body, setBody] = useState(<></>);
	const getInjury = (mod: number | string) => {
		const a = roll();
		const b = roll();
		if (typeof mod === "number") {
			if (mod > 0) {
				if (a + mod > 5) {
					return genericTables.injury[5];
				}
				return genericTables.injury[a + mod];
			}
			if (mod < 0) {
				if (a + mod < 0) {
					return genericTables.injury[0];
				}
				return genericTables.injury[a + mod];
			}
		}
		switch (mod) {
			case "disadvantage":
				const disadvantageResult = genericTables.injury[a < b ? a : b];
				return disadvantageResult;
			case "advantage":
				const advantageResult = genericTables.injury[a > b ? a : b];
				return advantageResult;
			default:
				return genericTables.injury[a];
		}
	};
	//FIXME: event.modifier types - I need to tweak the structure here for injury events
	useEffect(() => {
		setInjury(getInjury(event.modifier).type);
	}, [event.modifier]);

	useEffect(() => {
		switch (injury) {
			case "worst":
				setBody(<WorstInjury />);
				return;
			case "severe":
				setBody(<SevereInjury />);
				return;
			case "moderate":
				setBody(<ModerateInjury />);
				return;
			case "medium":
				setBody(<MediumInjury />);
				return;
			case "mild":
				setBody(<MildInjury />);
				return;
			case "none":
				setBody(<NoInjury />);
				return;
			default:
				setBody(<p>Something has gone wrong.</p>);
				return;
		}
	}, [injury]);
	return (
		<div className="injury_event">
			<h2>Injury event!</h2>
			{body}
		</div>
	);
};

export default InjuryEntry;
