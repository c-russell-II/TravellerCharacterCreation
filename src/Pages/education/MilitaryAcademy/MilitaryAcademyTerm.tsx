import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	setGraduated,
	setHonors,
} from "../../../features/education/EducationSlice";
import { AllSkills, basicTraining } from "../../../features/Skills/SkillsSlice";
import {
	getParentCareer,
	skillCheck,
} from "../../../features/Career/careerHandler";
import { ageUp } from "../../../features/Character/StatsSlice";
import { RootState } from "../../../app/store";
import { AnyTermReward } from "../../../features/CareerDetails/CareerTyping";
import {
	ChoiceTermReward,
	SkillTermReward,
} from "../../../features/CareerDetails/CareerTypes/TermAndRankRewardTypes";

export const MilitaryAcademyTerm = () => {
	const dispatch = useDispatch();
	const { branch } = useParams();
	const stats = useSelector((state: RootState) => state.stats);
	const [selectSkill, setSelectSkill] = useState(false);
	const [ready, setReady] = useState(false);
	const [choices, setChoices] = useState<ChoiceTermReward[]>([]);
	const [deferredSkills, setDeferredSkills] = useState<
		(AnyTermReward | string)[]
	>([]);
	const navigate = useNavigate();

	if (!branch) {
		console.error("no branch found in military academy term handler!");
		//TODO: Error boundary here!
		return (
			<p>How did you get here? Hopefully this disappears on its own...</p>
		);
	}

	const getMod = () => {
		let mod = stats.int;
		if (stats.end >= 8) {
			mod++;
		}
		if (stats.soc >= 8) {
			mod++;
		}
		return mod;
	};

	const handleGraduate = (event: React.SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();

		dispatch(ageUp());
		const graduateRoll = skillCheck(getMod());

		if (graduateRoll >= 11) {
			dispatch(setHonors());
			navigate("/mil_academy/" + branch + "/graduated");
			return;
		}
		if (graduateRoll >= 8) {
			dispatch(setGraduated());
			navigate("/mil_academy/" + branch + "/graduated");
			return;
		}
		navigate("/mil_academy/" + branch + "/no_graduate");
	};
	const handleStart = () => {
		const initialArray = getParentCareer(branch).skills.service;
		const skillArray = initialArray.filter(
			(e: AnyTermReward) => e.type === "skill"
		);
		const choiceArray = initialArray.filter(
			(e: AnyTermReward) => e.type === "choice"
		);
		if (choiceArray.length > 0) {
			setChoices(choiceArray as ChoiceTermReward[]);
			setDeferredSkills(
				initialArray.filter((e: AnyTermReward) => e.type !== "choice")
			);
			setSelectSkill(true);
			return;
		}
		const skills = skillArray.map((e: AnyTermReward) => {
			if (e.type === "skill") return e.skill;
			return;
		});
		dispatch(basicTraining(skills as (keyof AllSkills)[]));
		setReady(true);
	};
	const handleSelect = (
		event: React.SyntheticEvent<HTMLButtonElement>,
		index: number
	) => {
		if (index === 0) {
			setChoices((prev) => prev.slice(1));
		} else {
			setChoices((prev) =>
				prev.slice(0, index).concat(prev.slice(index + 1))
			);
		}
		setDeferredSkills((prev) => [...prev, event.currentTarget.value]);
		if (choices.length === 0) {
			const final: string[] = [];
			//Check whether it's already a string, if not, extract the string for the skill - with some type coercion because FIXME: Term reward typings...
			for (const item in deferredSkills) {
				if (typeof item === "string") {
					final.push(item);
				} else {
					const skillVer = item as SkillTermReward;
					final.push(skillVer.skill);
				}
			}
			dispatch(basicTraining(final as (keyof AllSkills)[]));
			setReady(true);
		}
	};

	return (
		<div className="military_academy">
			<h3>Ooyah, Hoorah, Hooah!</h3>
			{!selectSkill && !ready && (
				<button onClick={handleStart}>Let's get started!</button>
			)}
			{selectSkill && (
				<>
					<p>
						Select a skill to add to your basic training curriculum:
					</p>
					{choices.map((f, n) => {
						return (
							<>
								{f.list.map((e, i) => {
									return (
										<button
											key={i}
											onClick={(event) => {
												handleSelect(event, n);
											}}
											value={e}
										>
											{e}
										</button>
									);
								})}
							</>
						);
					})}
				</>
			)}
			{ready && (
				<>
					<p>
						Your term's training is complete - now for final exams.
					</p>
					<button onClick={handleGraduate}>Take the tests!</button>
				</>
			)}
		</div>
	);
};
