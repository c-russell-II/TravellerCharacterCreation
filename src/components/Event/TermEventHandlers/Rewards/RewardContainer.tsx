import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
	AnyEvent,
	RewardEvent,
} from "../../../../features/CareerDetails/CareerTypes/CareerEventTypes";
// import { skillCheck } from "../../Career/careerHandler";
// import { changeParole } from "../../Prison/Utilities/prisonSlice";
import {
	addDeferredEvents,
	resolveEvent,
} from "../../../../features/TermSlice/TermSlice";
import AddBenefit from "./AddBenefit";
import AdvancementReward from "./AdvancementReward";
import Ally from "./Ally";
import BenefitBonusReward from "./BenefitBonusReward";
import ChoiceReward from "./ChoiceReward";
import Contact from "./Contact";
import Enemy from "./Enemy";
import PromotionReward from "./PromotionReward";
import QualificationReward from "./QualificationReward";
import Rival from "./Rival";
import StatReward from "./StatReward";

const RewardContainer = (props: { event: RewardEvent }) => {
	const event = props.event;
	const [body, setBody] = useState(<></>);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!event) {
			//TODO: Error Boundary!
			return;
		}
		const result = event.result;
		switch (result.type) {
			case "choice":
				setBody(<ChoiceReward event={event} />);
				return;
			case "benefit":
				setBody(<BenefitBonusReward result={result} />);
				return;
			case "addBenefit":
				setBody(<AddBenefit event={result} />);
				return;
			case "promotion":
				setBody(<PromotionReward />);
				return;
			case "advancement":
				setBody(<AdvancementReward result={result} />);
				return;
			case "stat":
				setBody(<StatReward />);
				return;
			case "qualification":
				setBody(<QualificationReward result={result} />);
				return;
			case "rival":
				setBody(<Rival result={result} />);
				return;
			case "contact":
				setBody(<Contact result={result} />);
				return;
			case "ally":
				setBody(<Ally result={result} />);
				return;
			case "enemy":
				setBody(<Enemy result={result} />);
				return;
			//TODO: FIX CASE "PAROLE"
			// case "parole":
			// 	if (typeof event.result.value === "string") {
			// 		dispatch(changeParole(skillCheck()));
			// 		dispatch(resolveEvent());
			// 		return;
			// 	}
			// 	dispatch(changeParole(event.result.value));
			// 	dispatch(resolveEvent());
			// 	return;
			case "multiple":
				dispatch(
					addDeferredEvents(
						result.list.map((e: any) => {
							const current = result.details[e];
							if (isEvent(current)) return current as AnyEvent;
							return {
								type: "reward",
								description: event.description,
								result: current,
							} as RewardEvent;
						})
					)
				);
				dispatch(resolveEvent());
				return;
			default:
				return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<p>{event && event.type === "reward" && event.description}</p>
			{body}
		</>
	);
};

const isEvent = (event: any) => {
	if (
		event.type === "reward" ||
		event.type === "special" ||
		event.type === "check" ||
		event.type === "generic" ||
		event.type === "redirect" ||
		event.type === "choice"
	) {
		return true;
	}
	return false;
};
export default RewardContainer;
