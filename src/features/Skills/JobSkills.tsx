import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SplitButton from "react-bootstrap/SplitButton";
import Dropdown from "react-bootstrap/Dropdown";
import { AllSkills, AnySkill, genericIncrease, specSkill } from "./SkillsSlice";
import { increaseStat } from "../Character/StatsSlice";
import { SelectSpecialty } from "../../components/Skills/SelectSpecialty";
import Popup from "reactjs-popup";
import { RootState } from "../../app/store";
import { AnyTermReward } from "../CareerDetails/CareerTyping";
import { SkillTermReward } from "../CareerDetails/CareerTypes/TermAndRankRewardTypes";

//FIXME: This whole component is a nightmare that needs to be refactored into, like, five components. On the list.
export const JobSkills = (props: { cleanup: () => void }) => {
	const [needSpecialty, setNeedSpecialty] = useState(false);
	const [selectedSkill, setSelectedSkill] = useState<{
		skill: string;
		specialty: string | string[];
	}>({ skill: "", specialty: "" });
	const [skillChoice, setSkillChoice] = useState<{
		active: boolean;
		details: any;
	}>({
		active: false,
		details: { skill: "", list: [] },
	});
	const dispatch = useDispatch();
	const skills = useSelector((state: RootState) => state.skills);
	const edu = useSelector((state: RootState) => state.stats.edu);
	const { cleanup } = props;
	const careers = useSelector((state: RootState) => state.careers);
	const [noCareer, setNoCareer] = useState(false);
	const [skillDetails, setSkillDetails] = useState<{
		[key: string]: AnyTermReward[];
	}>({});
	useEffect(() => {
		const currJobName = careers.currentJob;
		if (!currJobName) {
			console.error(
				"no current career for JobSkills to index skill lists."
			);
			setNoCareer(true);
		} else {
			const careerSkills = careers.careerInfo[currJobName].details.skills;
			const final: { [key: string]: AnyTermReward[] } = {
				personal: careerSkills.personal,
				service: careerSkills.service,
				[currJobName]: careerSkills.specialties[currJobName],
			};
			const commission = careers.careerInfo[currJobName].commissioned;
			if (edu > 8 && careerSkills.advanced) {
				final.advanced = careerSkills.advanced;
			}
			if (commission && careerSkills.officer) {
				final.officer = careerSkills.officer;
			}
			setSkillDetails(final);
		}
	}, [careers.currentJob]);

	const skillHandler = (selection: SkillTermReward) => {
		const skill = selection.skill as keyof AllSkills;
		const specialty = selection.specialty[skill];

		if (!specialty) {
			dispatch(genericIncrease({ skill: skill }));
			cleanup();
			return;
		}
		if (specialty === "any") {
			setSelectedSkill({
				skill: skill,
				specialty: (skills[skill] as specSkill).specialtiesList,
			});
			setNeedSpecialty(true);
			return;
		}
		if (Array.isArray(specialty)) {
			setSelectedSkill({ skill: skill, specialty: specialty });
			setNeedSpecialty(true);
			return;
		}
		dispatch(genericIncrease({ skill: skill, specialty: specialty }));
		cleanup();
	};

	const handleClick = (table: AnyTermReward[]) => {
		const selection = table[Math.floor(Math.random() * table.length)];
		if (selection.type === "stat") {
			dispatch(increaseStat(selection.stat as keyof StatDisplayHolder));
			cleanup();
			return;
		}
		if (selection.type === "choice") {
			setSkillChoice({ active: true, details: selection });
			return;
		}
		if (selection.type === "skill") {
			skillHandler(selection);
		}
	};

	const handleChoice = (choice: string) => {
		const specialty = skillChoice.details.specialties[choice];
		skillHandler({
			type: "skill",
			skill: choice,
			specialty: { [choice]: specialty },
		});
	};

	const passSpecialty = (choice: string) => {
		dispatch(
			genericIncrease({
				skill: selectedSkill.skill as keyof AllSkills,
				specialty: choice,
			})
		);
		setNeedSpecialty(false);
		setSelectedSkill({ skill: "", specialty: [] });
		cleanup();
	};

	return (
		<div className="job_skills">
			{noCareer ? (
				<p>
					No Career Saved - how did you end up here? This may go away
					on its own as updates catch up.
				</p>
			) : (
				<>
					{Object.keys(skillDetails).map((e: string) => {
						return (
							<SplitButton
								key={`Split button for jobskill selection ${e}`}
								id={`skill dropdown menu`}
								variant="info"
								title={e}
								size="lg"
								onClick={() => handleClick(skillDetails[e])}
								autoClose={false}
							>
								{skillDetails[e].map((e, i) => {
									const value =
										e.type === "skill"
											? e.skill
											: e.type === "stat"
											? e.stat
											: e.type === "choice"
											? e.list.join(" ")
											: null;
									if (!value) {
										return;
									}
									return (
										<Dropdown.Item eventKey={value} key={i}>
											{value}
										</Dropdown.Item>
									);
								})}
							</SplitButton>
						);
					})}
					<Popup
						open={needSpecialty}
						modal
						closeOnDocumentClick={false}
					>
						<SelectSpecialty
							skill={selectedSkill.skill}
							list={selectedSkill.specialty as string[]}
							passSpecialty={passSpecialty}
						/>
					</Popup>

					<Popup
						open={skillChoice.active}
						modal
						closeOnDocumentClick={false}
					>
						<p>Select a skill:</p>
						{skillChoice.details.list.map(
							(e: string, i: number) => {
								return (
									<button
										onClick={() => handleChoice(e)}
										value={e}
										key={i}
									>
										{e}
									</button>
								);
							}
						)}
					</Popup>
				</>
			)}
		</div>
	);
};
