import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { genericIncrease } from "../Skills/SkillsSlice";
import { changeStat } from "../Character/StatsSlice";
import { SelectSpecialty } from "../Skills/selectSpecialty";
import { addQualificationBonus } from '../Character/miscBonusSlice'
import { GraduationDialogue } from "./GraduateDialogue";
import Popup from "reactjs-popup";
import { parentJobs } from "../Career/CareerDetails";

export const Graduation = (props) => {
    const educationState = useSelector(state => state.education);
    const dispatch = useDispatch();
    const { edu } = useSelector(state => state.stats);
    const skills = useSelector(state => state.skills);
    const [needSpecialty, setNeedSpecialty] = useState(false);

    useEffect(() => {
        if (educationState.graduated) {
            dispatch(changeStat({ edu: edu + 2 }))
            const qualBonusList = ['corporate', 'journalist'];
            const parentList = ['agent', 'army', 'marine', 'navy', 'scholar', 'scout'];
            parentList.forEach((e) => parentJobs[e].specialtiesList.forEach((f) => qualBonusList.push(f)))
            if (educationState.honors) {
                dispatch(addQualificationBonus({careers: qualBonusList, isTemp: false, value: 2}))
            } else {
                dispatch(addQualificationBonus({careers: qualBonusList, value: 1, isTemp: false}))
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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