import React, { useState } from "react";
import { skillCheck } from "../Career/careerHandler";
import { useDispatch } from "react-redux";
import { addEvent } from '../Character/charaSlice';
import Popup from 'reactjs-popup';

export const CheckEvent = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();

    const { event, stats, skills } = props;
    let mod = 0;
    if (event.checkStat) {
        mod = stats[event.checkStat];
    } else if (event.checkSkill) {
        mod = skills[event.checkSkill];
    }
    const result = event.checkDC <= skillCheck(mod);
    return (
        <Popup
            open={isOpen}
            modal
        >
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...'}</h5>
            <p>{props.event.description}</p>
            <p>{result ? props.event.pass.description : props.event.fail.description}</p>
            <button onClick={() => { setIsOpen(false); dispatch(addEvent(event)); }}>{result ? 'Well done.' : 'What a shame...'}</button>
        </Popup>
    );
};
