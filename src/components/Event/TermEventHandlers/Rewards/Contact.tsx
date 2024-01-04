import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { roll } from "../../../../features/Career/careerHandler";
import { addContact } from "../../../../features/Character/miscBonusSlice";
import { resolveEvent } from "../../../../features/TermSlice/TermSlice";
import { RootState } from "../../../../app/store";
import { ContactEventReward } from "../../../../features/CareerDetails/CareerTypes/EventRewardTypes";

const Contact = (props: {result: ContactEventReward}) => {
	const result = props.result;
	const dispatch = useDispatch();
	let value = result.value;
	const description = result.description;

	const handleClick = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
		ev.preventDefault();
		const deets = result;
		if (value === "roll") {
			const num = deets.roll;
			if (!num) {
				value = 1;
				return;
			}
			value = roll(num + 1);
		}
		dispatch(addContact({ value: value, description: description ? description : '' }));
		dispatch(resolveEvent());
		return;
	};
	return (
		<>
			<button onClick={handleClick}>Great!</button>
		</>
	);
};

export default Contact;
