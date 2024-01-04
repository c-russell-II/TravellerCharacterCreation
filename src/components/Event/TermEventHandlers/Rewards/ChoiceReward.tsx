import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RewardEvent } from "../../../../features/CareerDetails/CareerTyping";
import {
	addDeferredEvents,
	resolveEvent,
} from "../../../../features/TermSlice/TermSlice";
import SetSkillReward from "./ChoiceRewards/SetSkillReward";
import SkillIncreaseReward from "./ChoiceRewards/SkillIncreaseReward";
import StatChoiceReward from "./ChoiceRewards/StatChoiceReward";

const ChoiceReward = (props: { event: RewardEvent }) => {
	const event = props.event;
	const dispatch = useDispatch();
	const [body, setBody] = useState(<></>);

	useEffect(() => {
		if (event.result.type !== "choice") {
			//TODO: error boundaries
			console.warn(
				"improper event type passed to choice reward handler!"
			);
			return;
		}
		const result = event.result;
		switch (result.choiceType) {
			case "increaseAny":
				setBody(<SkillIncreaseReward event={result} />);
				return;
			case "increaseSkill":
				setBody(<SkillIncreaseReward event={result} />);
				return;
			case "multiple":
				const deferredArray = result.choiceList.map((e: string): RewardEvent => {
					return {
						//TODO: Check for type safety in result section of MultipleChoiceEventReward -- event.result.choiceDetails!
						type: "reward",
						description: event.description,
						result: result.choiceDetails[e],
					};
				});
				dispatch(addDeferredEvents(deferredArray));
				dispatch(resolveEvent());
				return;
			case "setSkill":
				setBody(<SetSkillReward event={result} />);
				return;
			case "setAny":
				setBody(<SetSkillReward event={result} />);
				return;
			// case 'redirect':
			//TODO: handle redirect reward event case!
			//     return;
			case "stat":
				setBody(<StatChoiceReward event={result} />);
				return;
			default:
				alert(
					"Unhandled Reward Choice Event! " + event.result.choiceType
				);
				dispatch(resolveEvent());
				return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <>{body}</>;
};

export default ChoiceReward;
