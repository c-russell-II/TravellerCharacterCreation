import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import {
	ChoiceCheckEvent,
	StatCheckEvent,
	SkillCheckEvent,
	anyCheckEvent,
} from "../../CareerDetails/CareerTyping";
import { AllSkills } from "../../Skills/SkillsSlice";
import { updateEvent } from "../../TermSlice/TermSlice";

const ChoiceCheck = (props: {
	cleanup: () => void;
	event: ChoiceCheckEvent;
}) => {
	const { cleanup, event } = props;
	const skills = useSelector((state: RootState) => state.skills);
	const [choice, setChoice] = useState<string>("");
	const dispatch = useDispatch();

	const handleChange = (ev: React.FormEvent<HTMLInputElement>) => {
		ev.preventDefault();
		setChoice(ev.currentTarget.value);
	};
	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		if (choice in skills) {
			const currSkill = skills[choice as keyof AllSkills];
			const newEvent = eventForming(event, "skill") as SkillCheckEvent;
			newEvent.checkType = "skill";
			if (!currSkill.specialties) {
				newEvent.checkSkill = choice;
				dispatch(updateEvent(newEvent));
				cleanup();
				return;
			}
			const specialtyList =
				event.specialtyList[choice] === "any"
					? currSkill.specialtiesList
					: "any";
			newEvent.checkSkill = choice;
			newEvent.checkType = "skill";
			let specialty = "";
			let specialtyVal = -3;
			if (Array.isArray(specialtyList)) {
				specialtyList.forEach((e) => {
					if (currSkill.specialty[e] > specialtyVal) {
						specialty = e;
						specialtyVal = currSkill.specialty[e];
					}
				});
			} else {
				specialty = specialtyList;
			}
			newEvent.specialty = specialty;
			dispatch(updateEvent(newEvent));
			cleanup();
			return;
		}
		const newEvent = eventForming(event, "stat") as StatCheckEvent;
		newEvent.checkType = "stat";
		newEvent.checkStat = choice;
		dispatch(updateEvent(newEvent));
		cleanup();
		return;
	};
	return (
		<>
			{event.checkType === "choice" && (
				<form name="choice" onSubmit={handleSubmit}>
					{event.choiceList?.map((e: string, i: number) => {
						return (
							<label key={"choice label for " + e + `at ${i}`}>
								<input
									type="radio"
									value={e}
									name="choice"
									key={`choice radio for ${e} at ${i}`}
									checked={choice === e}
									onChange={handleChange}
								/>
								{e}
							</label>
						);
					})}
					<input type="submit" name="choice" value="submit" />
				</form>
			)}
		</>
	);
};

// Takes in the previous event, and forms it into the base for the next event
const eventForming = (
	event: anyCheckEvent,
	type: "skill" | "stat"
): StatCheckEvent | SkillCheckEvent => {
	let newEvent: SkillCheckEvent | StatCheckEvent;
	if (type === "skill") {
		newEvent = {
			type: "check",
			checkType: "skill",
			checkSkill: "",
			checkDC: 0,
			pass: event.pass,
			fail: event.fail,
			description: event.description,
			specialty: "",
		};
	} else {
		newEvent = {
			type: "check",
			checkType: "stat",
			checkStat: "",
			checkDC: 0,
			pass: event.pass,
			fail: event.fail,
			description: event.description,
		};
	}
	return newEvent;
};

export default ChoiceCheck;
