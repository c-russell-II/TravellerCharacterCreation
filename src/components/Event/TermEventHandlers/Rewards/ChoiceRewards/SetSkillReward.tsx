import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import {
	SetAnyEventReward,
	SetSkillChoiceEventReward,
} from "../../../../../features/CareerDetails/CareerTyping";
import { SelectSpecialty } from "../../../../Skills/SelectSpecialty";
import { AllSkills, setValue } from "../../../../../features/Skills/SkillsSlice";
import { resolveEvent } from "../../../../../features/TermSlice/TermSlice";

const SetSkillReward = (props: {
	event: SetSkillChoiceEventReward | SetAnyEventReward;
}) => {
	const event = props.event;
	const skills = useSelector((state: RootState) => state.skills);
	const dispatch = useDispatch();
	const [skillList, setSkillList] = useState<string[]>([]);
	const [choice, setChoice] = useState("");
	const [needSpecialty, setNeedSpecialty] = useState(false);
	const [specList, setSpecList] = useState<string[]>([]);

	useEffect(() => {
		if (event.choiceType === "setAny") {
			setSkillList(Object.keys(skills).slice(0, -3));
		} else {
			setSkillList(event.choiceList);
		}
	}, [skills, event]);

	const specialtyHandler = () => {
		const currSkill = skills[choice as keyof AllSkills];
		if (!currSkill.specialties) {
			return;
		}
		if (event.choiceType === "setAny") {
			setNeedSpecialty(true);
			setSpecList(currSkill.specialtiesList);
			return;
		}
		const eventSpeclist = event.specialtyList[choice];
		if (eventSpeclist === null || eventSpeclist === "any") {
			setNeedSpecialty(true);
			setSpecList(currSkill.specialtiesList);
			return;
		}
		if (typeof eventSpeclist === "string") {
			dispatch(
				setValue({
					skill: choice as keyof AllSkills,
					value: event.value,
					specialty: eventSpeclist,
				})
			);
			dispatch(resolveEvent());
			return;
		}
		setNeedSpecialty(true);
		setSpecList(eventSpeclist);
		return;
	};

	const handleChange = (ev: React.SyntheticEvent<HTMLInputElement>) => {
		ev.preventDefault();
		setChoice(ev.currentTarget.value);
	};

	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		const currSkill = skills[choice as keyof AllSkills];
		if (currSkill.specialties) {
			specialtyHandler();
			return;
		}
		dispatch(
			setValue({ skill: choice as keyof AllSkills, value: event.value })
		);
		dispatch(resolveEvent());
		return;
	};

	const passSpecialty = (spec: string) => {
		dispatch(
			setValue({
				skill: choice as keyof AllSkills,
				value: event.value,
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
				<form name="skills" onSubmit={handleSubmit}>
					{skillList?.map((e, i) => (
						<label key={i}>
							<input
								key={Math.random()}
								type="radio"
								name="skills"
								value={e}
								onChange={handleChange}
								checked={choice === e}
							/>
							{e}
						</label>
					))}
					<input type="submit" value="Choose" name="skills" />
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

export default SetSkillReward;
