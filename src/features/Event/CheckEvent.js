import React, { useState } from "react";
import { skillCheck } from "../Career/careerHandler";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from '../Character/charaSlice';
import Popup from 'reactjs-popup';
import { resolveEvent } from "../Term/TermSlice";

export const CheckEvent = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();
    const event = useSelector(state => state.term.event);
    const stats = useSelector(state => state.stats);
    const skills = useSelector(state => state.skills);

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
            <p>{event.description}</p>
            <p>{result ? event.pass.description : event.fail.description}</p>
            <button onClick={() => { setIsOpen(false); dispatch(addEvent(event)); dispatch(resolveEvent());}}>{result ? 'Well done.' : 'What a shame...'}</button>
        </Popup>
    );
};
