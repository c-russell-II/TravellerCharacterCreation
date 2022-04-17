import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genericIncrease } from "../Skills/SkillsSlice";
import { changeStat } from "../Character/StatsSlice";
import { SelectSpecialty } from "../Skills/selectSpecialty";
import { addQualificationBonus } from '../Character/miscBonusSlice'
import { GraduationDialogue } from "./GraduateDialogue";
import Popup from "reactjs-popup";

export const Graduation = (props) => {
    const educationState = useSelector(state => state.education);
    const dispatch = useDispatch();
    const { edu, age } = useSelector(state => state.stats);
    const skills = useSelector(state => state.skills);
    const [needSpecialty, setNeedSpecialty] = useState(false);

    useEffect(() => {
        if (educationState.graduated) {
            dispatch(changeStat({ edu: edu + 2 }))
            if (educationState.honors) {
                dispatch(addQualificationBonus({ parentCareers: ['Agent', 'Army', 'Marines', 'Navy', 'Scholar', 'Scouts'], careers: ['corporate', 'journalist'], value: 2, age: age, duration: null, source: 'University' }))
            } else {
                dispatch(addQualificationBonus({ parentCareers: ['Agent', 'Army', 'Marines', 'Navy', 'Scholar', 'Scouts'], careers: ['corporate', 'journalist'], value: 1, age: age, duration: null, source: 'University' }))
            }
            if (educationState.majorSpecialty) {
                dispatch(genericIncrease({ skill: educationState.major, specialty: educationState.majorSpecialty }))
            } else {
                dispatch(genericIncrease({ skill: educationState.major }))
            }
            if (skills[educationState.minor].specialties) {
                setNeedSpecialty(true);
            } else {
                dispatch(genericIncrease({ skill: educationState.minor }))
            }
        }
    }, [age, dispatch, edu, educationState.graduated, educationState.honors, educationState.major, educationState.majorSpecialty, educationState.minor, skills])

    const handleSpecialty = (spec) => {
        dispatch(genericIncrease({ skill: educationState.minor, specialty: spec }));
        setNeedSpecialty(false);
        return;
    }

    return (
        <div>
            <GraduationDialogue />
            <Popup open={needSpecialty} modal closeOnDocumentClick="false">
                <SelectSpecialty skill={educationState.minor} list={educationState.minor === 'Animals' ? ['training', 'veterinary'] : skills[educationState.minor].specialtiesList} passSpecialty={handleSpecialty} />
            </Popup>
        </div>
    )
}