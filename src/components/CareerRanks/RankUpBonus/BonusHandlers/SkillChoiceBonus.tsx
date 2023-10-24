import { useEffect, useState } from "react";
import { AnySpecialty } from "../../../../features/CareerDetails/CareerTypes/SkillTypes";
import { RankSkillBonus, RankSkillChoiceBonus } from "../../../../features/CareerDetails/CareerTypes/TermAndRankRewardTypes";
import { AllSkills, AnySkill, noSpecSkill, setValue, skillState, specSkill } from "../../../../features/Skills/SkillsSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import Chooser from "../../../Chooser";


export default function SkillChoiceBonus (props: {cleanup: () => void, bonus: RankSkillChoiceBonus}) {
    const [options, setOptions] = useState<string[]>([])
    const [specOptions, setSpecOptions] = useState<{[key: string]: string[] | string}>({})
    const [needSpecialty, setNeedSpecialty] = useState(false);
    const dispatch = useDispatch();
    const skillState = useSelector((state: RootState) => state.skills)
    const {choiceList, specialty} = props.bonus;
    useEffect(() => {
        const tempOpts = filterSkills(skillState, choiceList, specialty, 1); 
        const tempSpecOptions: {[key: string]: string[] | string} = {}
        tempOpts.forEach((e: string) => {
            const currSkill = skillState[e as keyof AllSkills] 
            if (currSkill.specialties) {
                let list = specialty[e] as string | string[];
                if (list === 'any') {
                    list = currSkill.specialtiesList
                } else if (typeof list === 'string') {
                    tempSpecOptions[e] = list;
                    return;
                }
                tempSpecOptions[e] = filterSkillSpecialties(currSkill, 1, list)
            }
        })
        setOptions(tempOpts);
        setSpecOptions(tempSpecOptions)
    }, [choiceList])
    const cleanup = (choice: string) => {
        if (Array.isArray(specOptions[choice])) {
            setOptions([choice]);
            setNeedSpecialty(true);
            return;
        } else if (specOptions[choice]) {
            dispatch(setValue({skill: choice as keyof AllSkills, value: 1, specialty: specOptions[choice] as string}));
            props.cleanup();
            return;
        }
        dispatch(setValue({skill: choice as keyof AllSkills, value: 1}));
        props.cleanup();
        return;
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(setValue({skill: options[0] as keyof AllSkills, value: 1}));
        props.cleanup();
        return;
    }
    const specCleanup = (spec: string) => {
        dispatch(setValue({skill: options[0] as keyof AllSkills, value: 1, specialty: spec}));
        props.cleanup();
    }
    return (
        <>
            {options.length > 1 && <Chooser type="single" options={options} cleanup={cleanup} />}
            {needSpecialty && <Chooser type="single" options={specOptions[0] as string[]} cleanup={specCleanup} />}
            {options.length === 1 && !needSpecialty && <><p>You gain a the {options[0]} skill at rank 1.</p> <button onClick={handleClick}>Confirm</button></>}
        </>
    )
}

const filterSkillSpecialties = (skill: specSkill, value: number, list?: string[]) => {
    const options = list ? list : skill.specialtiesList;
    return options.filter((e: string) => skill.specialty[e] < value);
}

const filterSkills = (skills: skillState, choices: string[], specialties: AnySpecialty, value: number) => {
    //Separate the skills by whether or not they have specialties
    const nonSpecialty = choices.filter((e: string) => !skills[e as keyof AllSkills].specialties)
    const specialty = choices.filter((e: string) => skills[e as keyof AllSkills].specialties);

    //Filter the specialty list by whether or not they have any specialties that are below the set value.
    const filteredSpecialty = specialty.map((e: string) => {
        const currSkill = skills[e as keyof AllSkills] as specSkill
        const currSpecialties = specialties[e]
        //If the specialty passed for this skill is an array, pass that array as a list to the specialty filterer
        if (Array.isArray(currSpecialties)) {
            const list = filterSkillSpecialties(
				currSkill,
				value,
				currSpecialties
			);
            return list.length > 0 ? [e] : []
        } else if (currSpecialties === 'any') {
            //The filter is designed for "any" to be the default value - no passing a list.
            const list = filterSkillSpecialties(currSkill, value);
            return list.length > 0 ? [e] : []
        }
        //If the only available specialty is already over the threshold, return an empty array.
        if (currSkill.specialty[currSpecialties as string] >= value) {
            return []
        } else {
            //Finally, if the only allowed specialty is below the threshold value, pass back an array with the name of the current skill as the only key.
            return [currSpecialties as string]
        }
        //Then filter out all the empty arrays -
    }).filter((e: string[]) => e.length > 0 && e).flat();

    const filteredNonSpecialty = nonSpecialty.map((e: string) => {
        //get out the value!
        const currValue = (skills[e as keyof AllSkills] as noSpecSkill).value;
        if (currValue >= value) {
            return;
        } else {
            return e;
        }
    }).filter((e: string | undefined) => e);
    //There's some weird type conversion down there because it was telling me it could still be an undefined array even after that last filter pass? not sure why.
    return [...filteredSpecialty, ...filteredNonSpecialty as string[]]
}