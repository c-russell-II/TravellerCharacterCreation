import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { roll } from "../../../Career/careerHandler";
import { addEvent } from "../../../Character/charaSlice";
import { resolveEvent } from "../../../TermSlice/TermSlice";
import genericTables from "../../genericTables";
import { RootState } from "../../../../app/store";

const CloseHurt = () => {
	const misc = useSelector((state: RootState) => state.misc);
	const dispatch = useDispatch();

	const familyMembers = ["Parent", "Sibling"];
	const contacts = misc.contacts.map((e) => e.description);
	const allies = misc.allies.map((e) => e.description);
	const final = familyMembers.concat(allies.concat(contacts));

	const handleClick = (target: string) => {
		const severity = genericTables.injury[roll()];
		if (target === "Parent" || target === "Sibling") {
			//TODO: check how this event's logic is written - may need to tweak the text so it reads more clearly.
			dispatch(
				addEvent(
					`You bring your work home with you, and one of your ${target.toLowerCase()}s is hurt by it - severity: ${severity}`
				)
			);
			dispatch(resolveEvent());
			return;
		}
		dispatch(
			addEvent(
				`One of your contacts or allies is hurt when you bring your work back with you after an assignment. Severity: ${severity}. Description: ${target}`
			)
		);
		dispatch(resolveEvent());
		return;
	};

	return (
		<>
			<p>
				You bring your work home with you, and someone you care about is
				hurt as a result. Select which contact, ally, or family member
				is hurt by this.
			</p>
			{final.map((e, i) => {
				let description = e;
				if (e === "Parent" || e === "Sibling") {
					description = `A ${e}, or someone who fulfills a similar role in your life, and in your heart.`;
				}
				return (
					<div key={i}>
						<p>{description}</p>
						<button onClick={() => handleClick(e)}>
							Select them.
						</button>
					</div>
				);
			})}
		</>
	);
};

export default CloseHurt;
