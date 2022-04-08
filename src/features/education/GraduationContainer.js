import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genericIncrease } from "../Skills/SkillsSlice";
import { changeStat } from "../Character/StatsSlice";
import { SelectSpecialty } from "../Skills/selectSpecialty";
import { addQualificationBonus } from '../Character/miscBonusSlice'
import { GraduationDialogue } from "./GraduateDialogue";

export const Graduation = (props) => {
    const { major, minor, specialty, graduate, honors } = props;
    const dispatch = useDispatch();
    const { edu, age } = useSelector(state => state.stats);
    const skills = useSelector(state => state.skills);
    const [needSpecialty, setNeedSpecialty] = useState(false);

    useEffect(() => {
        if (graduate) {
            dispatch(changeStat({ edu: edu + 2 }))
            if (honors) {
                dispatch(addQualificationBonus({ parentCareers: ['Agent', 'Army', 'Marines', 'Navy', 'Scholar', 'Scouts'], careers: ['corporate', 'journalist'], value: 2, age: age, duration: null, source: 'University' }))
            } else {
                dispatch(addQualificationBonus({ parentCareers: ['Agent', 'Army', 'Marines', 'Navy', 'Scholar', 'Scouts'], careers: ['corporate', 'journalist'], value: 1, age: age, duration: null, source: 'University' }))
            }
            if (specialty !== null) {
                dispatch(genericIncrease({ skill: major, specialty: specialty }))
            } else {
                dispatch(genericIncrease({ skill: major }))
            }
            if (skills[minor].specialties) {
                setNeedSpecialty(true);
            } else {
                dispatch(genericIncrease({ skill: minor }))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSpecialty = (spec) => {
        dispatch(genericIncrease({ skill: minor, specialty: spec }));
        setNeedSpecialty(false);
        return;
    }

    return (
        <div>
            <GraduationDialogue major={major} honors={honors}/>
            {needSpecialty &&
                <SelectSpecialty skill={minor} list={skills[minor].specialtiesList} passSpecialty={handleSpecialty} />
            }
        </div>
    )
}