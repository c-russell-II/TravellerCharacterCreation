import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	AllSkills,
	genericIncrease,
	specSkill,
} from "../../../features/Skills/SkillsSlice";
import { changeByAmount } from "../../../features/Character/StatsSlice";
import { SelectSpecialty } from "../../../components/Skills/SelectSpecialty";
import { addQualificationBonus } from "../../../features/Character/miscBonusSlice";
import { GraduationDialogue } from "./GraduateDialogue";
import Popup from "reactjs-popup";
import { parentJobs } from "../../../features/CareerDetails/CareerDetails";
import { RootState } from "../../../app/store";

export const Graduation = () => {
	const educationState = useSelector((state: RootState) => state.education);
	const skills = useSelector((state: RootState) => state.skills);
	const age = useSelector((state: RootState) => state.stats.age);
	const [needSpecialty, setNeedSpecialty] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (educationState.graduated) {
			dispatch(changeByAmount({ stat: "edu", value: 2 }));
			const qualBonusList = ["corporate", "journalist"];
			const parentList = [
				"agent",
				"army",
				"marine",
				"navy",
				"scholar",
				"scout",
			];
			parentList.forEach((e) => {
				const current = parentJobs[e];
				if (Array.isArray(current)) return;
				current.specialtiesList.forEach((f) => qualBonusList.push(f));
			});
			if (educationState.honors) {
				dispatch(
					addQualificationBonus({
						careers: qualBonusList,
						isTemp: false,
						value: 2,
						age: age,
					})
				);
			} else {
				dispatch(
					addQualificationBonus({
						careers: qualBonusList,
						value: 1,
						isTemp: false,
						age: age,
					})
				);
			}
			if (educationState.majorSpecialty) {
				dispatch(
					genericIncrease({
						skill: educationState.major as keyof AllSkills,
						specialty: educationState.majorSpecialty,
					})
				);
			} else {
				dispatch(
					genericIncrease({
						skill: educationState.major as keyof AllSkills,
					})
				);
			}
			if (skills[educationState.minor as keyof AllSkills].specialties) {
				setNeedSpecialty(true);
			} else {
				dispatch(
					genericIncrease({
						skill: educationState.minor as keyof AllSkills,
					})
				);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSpecialty = (spec: string) => {
		dispatch(
			genericIncrease({
				skill: educationState.minor as keyof AllSkills,
				specialty: spec,
			})
		);
		setNeedSpecialty(false);
		return;
	};

	return (
		<div>
			<GraduationDialogue />
			<Popup open={needSpecialty} modal closeOnDocumentClick={false}>
				<SelectSpecialty
					skill={educationState.minor}
					list={
						/* FIXME: Type coercion in Graduation Container specialty list. */
						educationState.minor === "Animals"
							? ["training", "veterinary"]
							: (
									skills[
										educationState.minor as keyof AllSkills
									] as specSkill
							  ).specialtiesList
					}
					passSpecialty={handleSpecialty}
				/>
			</Popup>
		</div>
	);
};
