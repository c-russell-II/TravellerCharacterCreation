import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectSpecialty } from "./selectSpecialty";
import { genericIncrease } from "./SkillsSlice";

const IncreaseSkillChoice = (props) => {
    const {skillList, specialtyList, cleanup} = props;
    const skills = useSelector(state => state.skills);

    const {needSpecialty, setNeedSpecialty} = useState({active: false})
    const dispatch = useDispatch();

    const passSpecialty = (choice) => {
        dispatch(genericIncrease({skill: needSpecialty.skill, specialty: choice}));
        setNeedSpecialty({active: false});
        cleanup();
    }

    const handleClick = (event) => {
        event.preventDefault();
        const skill = event.target.value;
        if (skills[skill].specialties) {
            if (specialtyList[skill] === 'any') {
                setNeedSpecialty({active: true, skill: skill, list: skills[skill].specialtyList});
                return;
            } else if (Array.isArray(specialtyList[skill])) {
                setNeedSpecialty({active: true, skill: skill, list: skills[skill].specialtyList});
                return;
            } else if (typeof specialtyList[skill] === 'string') {
                dispatch(genericIncrease({skill: skill, specialty: specialtyList[skill]}))
                cleanup();
                return;
            }
        }
        dispatch(genericIncrease({skill: skill}));
        cleanup();
        return;
    }

    return (
        <>
            <h4>Select a skill:</h4>
            {skillList.map((e, i) => <label key={i}><button value={e} onClick={handleClick}/>{e}</label>)}
            {needSpecialty.active && <SelectSpecialty {...needSpecialty} passSpecialty={passSpecialty}/>}
        </>
    )
}

export default IncreaseSkillChoice;