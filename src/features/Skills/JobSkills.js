import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jobObject, {parentJobs} from "../Career/CareerDetails";
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { genericIncrease } from "./SkillsSlice";
import { increaseStat } from "../Character/StatsSlice";
import { SelectSpecialty } from "./selectSpecialty";

export const JobSkills = () => {
    const [needSpecialty, setNeedSpecialty] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState({})
    const props = {job: 'intelligence'};
    const dispatch = useDispatch();
    const skills = useSelector(state => state.skills);
    const skillNames = ['personal', 'advanced', 'service', 'intelligence'];
    const specialtySkill = parentJobs.agent.skills.specialties[props.job];
    const genericList = [jobObject.intelligence.skills.personal, jobObject.intelligence.skills.advanced, jobObject.intelligence.skills.service]
    const finishedList = [...genericList, specialtySkill];
    
    const handleClick = (table) => {
        const selection = table[Math.floor(Math.random() * table.length)]
        if (selection.type === 'skill') {
            if (skills[selection.skill].specialties) {
                if (skills[selection.skill].trained) {
                    if (!selection.specialty) {
                        setSelectedSkill({...selection, specialty: skills[selection.skill].specialtiesList});
                        setNeedSpecialty(true);
                        return;
                    }
                    if (typeof selection.specialty === "string") {
                        dispatch(genericIncrease({skill: selection.skill, specialty: selection.specialty}))
                        return;
                    }
                    setSelectedSkill(selection);
                    setNeedSpecialty(true);
                    return;
                }
            }
            dispatch(genericIncrease({skill: selection.skill}))
            return;
        }
        dispatch(increaseStat(selection.stat));
        return;
    }

    const passSpecialty = (choice) => {
        dispatch(genericIncrease({skill:selectedSkill.skill, specialty:choice}));
        setNeedSpecialty(false);
        setSelectedSkill({});
    }

    return(
        <div>
            {finishedList.map((e, i) => {
                return (
                    <SplitButton
                        key={i}
                        id={`dropdown-split-variants-info`}
                        variant='info'
                        title={skillNames[i]}
                        size='lg'
                        onClick={() => handleClick(e)}
                        autoClose={false}
                    >
                        {finishedList[i].map((e, i) => {const value = e.skill ? e.skill : e.stat; return (<Dropdown.Item eventKey={value} key={i}>{value}</Dropdown.Item>)})}
                    </SplitButton>
                )
            })}
            {needSpecialty &&
                <SelectSpecialty skill={selectedSkill.skill} list={selectedSkill.specialty} passSpecialty={passSpecialty} />
            }
        </div>
        )
}