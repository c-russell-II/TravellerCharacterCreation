import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AllSkills, setValue } from "../../../Skills/SkillsSlice";
import { updateEvent } from "../../../TermSlice/TermSlice";
import { RootState } from "../../../../app/store";

const GainRoll = () => {
	const skills = useSelector((state: RootState) => state.skills);
	const dispatch = useDispatch();

	const handleClick = (choice: string) => {
		dispatch(setValue({ skill: choice as keyof AllSkills, value: 1 }));
		dispatch(
			updateEvent({
				type: "check",
				description:
					"Political upheaval strikes your homeworld, and you are caught up in the revolution.",
				checkType: "skill",
				checkSkill: choice,
				checkDC: 8,
				pass: {
					type: "reward",
					description: "You come out on the winning side!",
					result: { type: "advancement", value: 2 },
				},
				//TODO: fix the typing for "gainroll" special event - it's another, weird special event type that is breaking my typing system. A debuff to your next survival roll.
				fail: {
					type: "reward",
					description:
						"You end up on the losing side of the revolution.",
					result: { type: "survival", value: -2 },
				},
			})
		);
		return;
	};

	return (
		<>
			<p>
				Political upheaval strikes your homeworld, and you are caught up
				in the revolution.
			</p>
			<p>Select a skill to learn during this time:</p>
			{skills.Advocate.value < 1 && (
				<button onClick={() => handleClick("Advocate")}>
					Advocate
				</button>
			)}
			{skills.Persuade.value < 1 && (
				<button onClick={() => handleClick("Persuade")}>
					Persuade
				</button>
			)}
			{skills.Explosives.value < 1 && (
				<button onClick={() => handleClick("Explosives")}>
					Explosives
				</button>
			)}
			{skills.Streetwise.value < 1 && (
				<button onClick={() => handleClick("Streetwise")}>
					Streetwise
				</button>
			)}
		</>
	);
};

export default GainRoll;
