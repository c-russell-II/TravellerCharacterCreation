import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { genericIncrease } from "./SkillsSlice";
import { increaseStat } from "../Character/StatsSlice";
import { SelectSpecialty } from "./selectSpecialty";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";
import jobObject from "../Career/CareerDetails";

export const JobSkills = (props) => {
    const [needSpecialty, setNeedSpecialty] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState({})
    const [skillChoice, setSkillChoice] = useState({})
    const dispatch = useDispatch();
    const skills = useSelector(state => state.skills);
    const {cleanup} = props;
    const {career} = useParams();
    const careerSkills = jobObject[career].skills;

    const skillNames = ['personal', 'service', 'advanced', career]
    const finishedList = [careerSkills.personal, careerSkills.service, careerSkills.advanced, careerSkills.specialties[career]]

    const skillHandler = (selection) => {
        if (!skills[selection.skill].specialties) {
            dispatch(genericIncrease({skill: selection.skill}))
            cleanup();
            return;
        }
        if (!selection.specialty) {
            setSelectedSkill({...selection, specialty: skills[selection.skill].specialtiesList});
            setNeedSpecialty(true);
            return;
        }
        if (typeof selection.specialty === "string") {
            dispatch(genericIncrease({skill: selection.skill, specialty: selection.specialty}))
            cleanup();
            return;
        }
        setSelectedSkill(selection);
        setNeedSpecialty(true);
        return;
    }

    const handleClick = (table) => {
        const selection = table[Math.floor(Math.random() * table.length)]
        if (selection.type === 'stat') {
            dispatch(increaseStat(selection.stat));
            cleanup();
            return;
        }
        if (selection.type === 'choice') {
            setSkillChoice({active: true, details: selection})
            return;
        }
        if (selection.type === 'skill') {
            skillHandler(selection)
        }
    }

    const handleChoice = (event) => {
        event.preventDefault();
        const specialty = skillChoice.details.specialties[event.target.value]
        skillHandler({skill: event.target.value, specialty: specialty})
    }

    const passSpecialty = (choice) => {
        dispatch(genericIncrease({skill:selectedSkill.skill, specialty:choice}));
        setNeedSpecialty(false);
        setSelectedSkill({});
        cleanup();
    }

    return(
        <div>
            {finishedList.map((e, i) => {
                return (
                    <SplitButton
                        key={i}
                        id={`skill dropdown menu`}
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
                <Popup open={needSpecialty} modal closeOnDocumentClick={false}>
                    <SelectSpecialty skill={selectedSkill.skill} list={selectedSkill.specialty} passSpecialty={passSpecialty} />
                </Popup>

                <Popup open={skillChoice.active} modal closeOnDocumentClick={false}>
                    <p>Select a skill:</p>
                    {skillChoice.details.list.map((e, i) => {return <button onClick={handleChoice} value={e} key={i}>{e}</button>})}
                </Popup>

            
        </div>
        )
}