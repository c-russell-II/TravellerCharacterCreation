import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { RankSkillBonus } from "../../../../features/CareerDetails/CareerTypes/TermAndRankRewardTypes";
import { useDispatch } from "react-redux";
import { AllSkills, genericIncrease } from "../../../../features/Skills/SkillsSlice";
import { RootState } from "../../../../app/store";
import { SelectSpecialty } from "../../../Skills/SelectSpecialty";

export default function SingleSkillBonus(props: {
	cleanup: () => void;
	bonus: RankSkillBonus;
}) {
	const [needSpecialty, setNeedSpecialty] = useState(false);
	const [specialtyList, setSpecialtyList] = useState<string[]>([]);
	const [chosenSpecialty, setChosenSpecialty] = useState<string>("");
	const skillState = useSelector((state: RootState) => state.skills[props.bonus.skill as keyof AllSkills])
	const skill = props.bonus.skill;
	const specialty = props.bonus.specialty[skill];
    const dispatch = useDispatch();

	useEffect(() => {
		if (!skillState.specialties) return;
		const currentSpecialty = props.bonus.specialty[props.bonus.skill];
		if (Array.isArray(currentSpecialty)) {
			setSpecialtyList(currentSpecialty);
			setNeedSpecialty(true);
		}
		if (currentSpecialty === 'any') {
			setSpecialtyList(skillState.specialtiesList);
			setNeedSpecialty(true);
		}
	}, [props.bonus.skill, props.bonus.specialty[props.bonus.skill]])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
		if (chosenSpecialty) {
			dispatch(genericIncrease({skill: skill as keyof AllSkills, value: props.bonus.value, specialty: chosenSpecialty}));
			props.cleanup();
			return;
		} else if (typeof specialty === 'string' && specialty !== 'any') {
			dispatch(genericIncrease({skill: skill as keyof AllSkills, value: props.bonus.value, specialty: specialty}));
			props.cleanup();
			return;
		}
        dispatch(genericIncrease({skill: skill as keyof AllSkills, value: props.bonus.value}))
		props.cleanup();
		return;
    }

	const specialtyCleanup = (specialty: string) => {
		setNeedSpecialty(false);
		setChosenSpecialty(specialty);
		return;
	}

	return (
		<>
			{needSpecialty ? (
				<SelectSpecialty skill={skill} list={specialtyList} passSpecialty={specialtyCleanup} />
			) : (
				<>
					<p>
						Whether due to continuing education, special training,
						or just as a natural consequence of your work at your
						new rank, being promoted has come with an increase to
						your {skill} skill of {props.bonus.value}.
					</p>{" "}
					<button onClick={handleClick}>Confirm</button>
				</>
			)}
		</>
	);
}
