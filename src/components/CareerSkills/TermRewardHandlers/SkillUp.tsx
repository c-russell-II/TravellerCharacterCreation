import { useState } from "react";
import { SkillTermReward } from "../../../features/CareerDetails/CareerTypes/TermAndRankRewardTypes";
import { SelectSpecialty } from "../../Skills/SelectSpecialty";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { AllSkills, genericIncrease, specSkill } from "../../../features/Skills/SkillsSlice";


export default function SkillUp (props: {reward: SkillTermReward, cleanup: () => void}) {
    const skill = props.reward.skill;
    const specialty = props.reward.specialty[skill];
    const dispatch = useDispatch();
    const skillState = useSelector((state: RootState) => state.skills[skill as keyof AllSkills])
    //Initializing the specialtyPending state to a call to determine if
    const [specialtyPending, setSpecialtyPending] = useState(Array.isArray(specialty) || specialty === 'any');
    const [chosenSpecialty, setChosenSpecialty] = useState('');

    //Function to confirm that I'm passing an array of possible specialties to the select specialty component - and fetch that array, if the value is "any" instead.
    const getSpecialtyArray = () => {
        if (Array.isArray(specialty)) {
            return specialty;
        } else if (specialty === 'any') {
            return (skillState as specSkill).specialtiesList;
        }
        return [];
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        //Check if the skill has specialties
        if(skillState.specialties) {
            dispatch(genericIncrease({skill: skill as keyof AllSkills, specialty: chosenSpecialty}))
        } else {
            dispatch(genericIncrease({skill: skill as keyof AllSkills}))
        }
        props.cleanup();
        return;
    }

    const specialtyCarrier = (choice: string) => {
        setSpecialtyPending(false);
        setChosenSpecialty(choice);
    }
    return (
        <>
            <p>Through continuing education, personal effort, or simple experience, your {skill} skill has increased by one.</p>
            {specialtyPending ? <SelectSpecialty skill={skill} list={getSpecialtyArray()} passSpecialty={specialtyCarrier}/> : <button onClick={handleClick}>Confirm</button>}
        </>
    )
}