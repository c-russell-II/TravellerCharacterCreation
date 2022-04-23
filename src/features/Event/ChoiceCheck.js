import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../Term/TermSlice";

const ChoiceCheck = (props) => {
    const event = useSelector(state => state.term.event);
    const skills = useSelector(state=> state.skills);
    const [choice, setChoice] = useState('');
    const {cleanup} = props;
    const dispatch = useDispatch();
    
    const handleChange = (ev) => {
        ev.preventDefault();
        setChoice(ev.target.value);
    }
    const handleSubmit = (ev) => {
        ev.preventDefault();
        const isSkill = Object.keys(skills).includes(choice);
        const newEvent = {
            type: 'check',
            ...event
        }
        if (isSkill) {
            const specialtyList = event.specialtyList[choice] === 'any' ? skills[choice].specialtyList : event.specialtyList[choice];
            newEvent.checkSkill = choice;
            let specialty = ''
            let specialtyVal = -3;
            if (Array.isArray(specialtyList)) {
                specialtyList.forEach((e) => {
                    if (skills[choice][e] > specialtyVal) {
                        specialty = e;
                        specialtyVal = skills[choice][e];
                    }
                })
            } else {
                specialty = specialtyList;
            }
            newEvent.specialty = specialty;
            newEvent.specialtyList = null;
            newEvent.choiceList = null;
            dispatch(updateEvent(newEvent));
            cleanup();
            return;
        }
        newEvent.checkType = 'stat';
        newEvent.checkStat = choice;
        dispatch(updateEvent(newEvent));
        cleanup();
        return;

    }
    return (
        <>
            <form name="choice" onSubmit={handleSubmit}>
                {event.choiceList.map((e, i) => {
                    return (
                        <label key={i}><input type="radio" value={e} name="choice" checked={choice===e} onChange={handleChange}/>{e}</label>
                    )
                })}
                <input type="submit" value="submit"/>
            </form>
        </>
    )
}

export default ChoiceCheck;