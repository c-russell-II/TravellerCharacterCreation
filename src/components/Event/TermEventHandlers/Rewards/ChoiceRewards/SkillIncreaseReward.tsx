import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectSpecialty } from "../../../../../components/Skills/SelectSpecialty";
import {
	AllSkills,
	genericIncrease,
	skillState,
} from "../../../../../features/Skills/SkillsSlice";
import { resolveEvent } from "../../../../../features/TermSlice/TermSlice";
import { RootState } from "../../../../../app/store";
import {
	IncreaseAnyEventReward,
	IncreaseSkillEventReward,
} from "../../../../../features/CareerDetails/CareerTypes/EventRewardTypes";

type AnySkillIncrease = IncreaseAnyEventReward | IncreaseSkillEventReward;
const SkillIncreaseReward = (props: { event: AnySkillIncrease }) => {
	const event = props.event;
	const skills = useSelector((state: RootState) => state.skills);
	const dispatch = useDispatch();
	const [skillList, setSkillList] = useState<string[]>([]);
	const [choice, setChoice] = useState("");
	const [needSpecialty, setNeedSpecialty] = useState(false);
	const [specList, setSpecList] = useState<any[]>([]);

	//TODO: Handle generic skill increases that will take you over the level cap!
	useEffect(() => {
		if (event.choiceType === "increaseAny") {
			setSkillList(getAllSkills(skills));
		} else {
			setSkillList(event.choiceList);
		}
	}, [event, skills.trainedSkills]);

	const specialtyHandler = (event: IncreaseSkillEventReward) => {
		const skill = skills[choice as keyof AllSkills];
		if (!skill.specialties) {
			console.warn("Invalid skill chosen when specialty handler called.");
			return;
		}
		const choiceSpecialty = event.specialty[choice];
		if (choiceSpecialty === "any" || !choiceSpecialty) {
			setNeedSpecialty(true);
			setSpecList(skill.specialtiesList);
			return;
		}
		if (typeof choiceSpecialty === "string") {
			dispatch(
				genericIncrease({
					skill: choice as keyof AllSkills,
					value: 1,
					specialty: choiceSpecialty,
				})
			);
			dispatch(resolveEvent());
			return;
		}
		setNeedSpecialty(true);
		setSpecList(choiceSpecialty);
		return;
	};

	const handleChange = (ev: React.FormEvent<HTMLInputElement>) => {
		ev.preventDefault();
		setChoice(ev.currentTarget.value);
		return;
	};
	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		if (skills[choice as keyof AllSkills].specialties) {
			specialtyHandler(event as IncreaseSkillEventReward);
		}
		dispatch(
			genericIncrease({
				skill: choice as keyof AllSkills,
				value: 1,
			})
		);
		dispatch(resolveEvent());
		return;
	};

	const passSpecialty = (spec: string) => {
		dispatch(
			genericIncrease({
				skill: choice as keyof AllSkills,
				value: 1,
				specialty: spec,
			})
		);
		setNeedSpecialty(false);
		dispatch(resolveEvent());
		return;
	};

	return (
		<>
			{!needSpecialty && (
				<form name="skill" onSubmit={handleSubmit}>
					{skillList.map((e, i) => (
						<label key={i}>
							<input
								key={Math.random()}
								type="radio"
								name="skill"
								value={e}
								checked={choice === e}
								onChange={handleChange}
							/>
							{e}
						</label>
					))}
					<input type="submit" value="Choose" name="skill" />
				</form>
			)}

			{needSpecialty && (
				<SelectSpecialty
					skill={choice}
					list={specList}
					passSpecialty={passSpecialty}
				/>
			)}
		</>
	);
};

const getAllSkills = (skills: skillState) => {
	const returnArr = [];
	for (const key in skills) {
		if (
			key !== "trainedSkills" &&
			key !== "specialtySkills" &&
			key !== "isTrained"
		) {
			returnArr.push(key);
		}
	}
	return returnArr;
};
export default SkillIncreaseReward;
