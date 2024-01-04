import MinorSelection from "./MinorSelection";
import MajorSelection from "./MajorSelection";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	AllSkills,
	increaseToZero,
	setValue,
} from "../../../features/Skills/SkillsSlice";
import { ageUp, increaseStat } from "../../../features/Character/StatsSlice";
import { Graduation } from "../Graduation/GraduationContainer";
import { skillCheck } from "../../../features/Career/careerHandler";
import {
	setGraduated,
	setHonors,
} from "../../../features/education/EducationSlice";
import styles from "./styles.module.css";
import { RootState } from "../../../app/store";

export const UniversityTerm = () => {
	const dispatch = useDispatch();
	const stats = useSelector((state: RootState) => state.stats);
	const educationState = useSelector((state: RootState) => state.education);
	const [majorIsActive, setMajorIsActive] = useState(true);
	const [minorIsActive, setMinorIsActive] = useState(false);
	const [graduateDialogue, setGraduateDialogue] = useState(false);

	const allChoices = [
		"Admin",
		"Advocate",
		"Animals",
		"Art",
		"Astrogation",
		"Electronics",
		"Engineer",
		"Language",
		"Medic",
		"Navigation",
		"Profession",
		"Science",
	];
	const choiceSpecArray = [
		"Animals",
		"Art",
		"Electronics",
		"Engineer",
		"Language",
		"Profession",
		"Science",
	];
	const animalSpec = ["training", "veterinary"];

	const majorCleanup = () => {
		setMajorIsActive(false);
		setMinorIsActive(true);
	};

	const minorCleanup = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (educationState.majorSpecialty) {
			dispatch(
				setValue({
					skill: educationState.major as keyof AllSkills,
					value: 1,
					specialty: educationState.majorSpecialty,
				})
			);
		} else {
			dispatch(
				setValue({
					skill: educationState.major as keyof AllSkills,
					value: 1,
				})
			);
		}
		dispatch(ageUp());
		dispatch(increaseToZero(educationState.minor));
		dispatch(increaseStat("edu"));
		setMinorIsActive(false);
		setGraduateDialogue(true);
		const graduateCheck = skillCheck(stats.edu);
		const didGraduate = graduateCheck >= 7;
		const hasHonors = graduateCheck >= 11;
		if (didGraduate && hasHonors) {
			dispatch(setHonors());
		} else if (didGraduate) {
			dispatch(setGraduated());
		}
		return;
	};

	//TODO: Implement Uni Events!

	return (
		<div className="university_term">
			<h3 className={styles.termHeader}>Back to School. . .</h3>
			{!graduateDialogue && (
				<h4>
					Select your major and minor for this year- the two skills
					you set out to focus your studies on.
				</h4>
			)}
			{majorIsActive && (
				<MajorSelection
					cleanup={majorCleanup}
					allChoices={allChoices}
					choiceSpecArray={choiceSpecArray}
					animalSpec={animalSpec}
				/>
			)}
			{minorIsActive && (
				<MinorSelection
					allChoices={allChoices}
					cleanup={minorCleanup}
				/>
			)}
			{graduateDialogue && <Graduation />}
		</div>
	);
};
