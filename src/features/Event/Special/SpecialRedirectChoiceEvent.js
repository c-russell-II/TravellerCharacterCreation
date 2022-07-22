import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jobObject, { parentJobs } from "../../CareerDetails/CareerDetails";
import { roll, skillCheck } from "../../Career/careerHandler";
import { SelectSpecialty } from "../../Skills/selectSpecialty";
import { genericIncrease } from "../../Skills/SkillsSlice";
import { addDeferredEvents, resolveEvent, updateEvent } from "../../TermSlice/TermSlice";

const SpecialRedirectChoiceEvent = (props) => {
    const event = useSelector(state => state.term.event);
    const skills = useSelector(state => state.skills);
    const [intro, setIntro] = useState(true);
    const [skillChoice, setSkillChoice] = useState(false);
    const [needSpecialties, setNeedSpecialties] = useState(false);
    const dispatch = useDispatch();

    const handleCitizen = () => {
        setIntro(false);
        if (event.pass) {
            setSkillChoice('citizen');
            dispatch(addDeferredEvents([parentJobs.citizen.eventList[skillCheck()]]))
            return;
        }
        dispatch(updateEvent(parentJobs.citizen.mishapList[roll()]))
        return;
    }

    const handleRogue = () => {
        setIntro(false);
        if (event.pass) {
            setSkillChoice('rogue');
            dispatch(addDeferredEvents([parentJobs.rogue.eventList[skillCheck()]]));
            return;
        }
        dispatch(updateEvent(parentJobs.rogue.mishapList[roll()]))
        return;
    }

    const handleClick = (table) => {
        const res = table[roll()];
        if (!skills[res.skill].specialties) {
            dispatch(genericIncrease({skill: res.skill}))
            dispatch(resolveEvent());
            return;
        }
        if (typeof res.specialty === 'string') {
            dispatch(genericIncrease({skill: res.skill, specialty: res.specialty}))
            dispatch(resolveEvent());
            return;
        }
        if (!res.specialty) {
            setNeedSpecialties({skill: res.skill, list: skills[res.skill].specialtiesList});
            return;
        }
        setNeedSpecialties({skill: res.skill, list: res.specialty});
        return;

    }

    const passSpecialty = (spec) => {
        dispatch(genericIncrease({skill: needSpecialties.skill, specialty: spec}));
        setNeedSpecialties();
        dispatch(resolveEvent());
        return;
    }

    return (
        <>
            <p>{event.description}</p><br/>
            {intro &&
            <><p>Select whether you were going undercover to deal with a criminal organization, or a civilian one (either foreign or domestic).</p>
            <button onClick={handleCitizen}>Citizen</button><button onClick={handleRogue}>Rogue</button></>}

            {skillChoice &&
                <>
                    <p>Select what role you are playing while undercover:</p>
                    {parentJobs[skillChoice].specialtiesList.map((e, i) => <button key={i} onClick={() => handleClick(parentJobs[skillChoice].skills.specialties[e])}>{jobObject[e].title}</button>)}
                </>
            }
            {needSpecialties &&
                <SelectSpecialty {...needSpecialties} passSpecialty={passSpecialty}/>
            }
        </>
    )
}

export default SpecialRedirectChoiceEvent;