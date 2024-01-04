import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { StatChoiceEventReward } from "../../../../../features/CareerDetails/CareerTyping";
import { changeByAmount } from "../../../../../features/Character/StatsSlice";
import { resolveEvent } from "../../../../../features/TermSlice/TermSlice";

const StatChoiceReward = (props: { event: StatChoiceEventReward }) => {
	const dispatch = useDispatch();
	const [choice, setChoice] = useState("");
	const event = props.event;
	if (event.type !== "choice" || event.choiceType !== "stat") {
		console.warn("Incorrect event type in stat choice reward handler");
		return (
			<>
				You got here without a correct type of event - if you just
				clicked a button, this should disappear momentarily.
			</>
		);
	}

	const handleChange = (ev: React.FormEvent<HTMLInputElement>) => {
		ev.preventDefault();
		setChoice(ev.currentTarget.value);
	};
	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		dispatch(
			changeByAmount({
				stat: choice as keyof StatDisplayHolder,
				value: event.value,
			})
		);
		dispatch(resolveEvent());
		return;
	};
	return (
		<>
			<form name="stat" onSubmit={handleSubmit}>
				{event.choiceList.map((e, i) => (
					<label key={i}>
						<input
							key={"input ele for " + e + "at index " + i}
							type="radio"
							name="stat"
							value={e}
							checked={choice === e}
							onChange={handleChange}
						/>
						{e}
					</label>
				))}
				<input type="submit" value="Choose" name="stat" />
			</form>
		</>
	);
};

export default StatChoiceReward;
