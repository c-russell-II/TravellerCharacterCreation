import React from "react";
import { skillCheck } from "../Career/careerHandler";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../Term/TermSlice";

export const CheckEvent = (props) => {
    const dispatch = useDispatch();
    const event = useSelector(state => state.term.event);
    const stats = useSelector(state => state.stats);
    const skills = useSelector(state => state.skills);

    const handleClick = () => {
        let mod = 0;
        if (event.checkStat) {
            mod = stats[event.checkStat];
        } else if (event.checkSkill) {
            mod = skills[event.checkSkill];
        }
        const result = event.checkDC <= skillCheck(mod);
        if (result) {
            dispatch(updateEvent({type: 'reward', description: event.description + ' ' + event.pass.description, result: event.pass.result}))
        } else {
            dispatch(updateEvent({type: 'reward', description: event.description + ' ' + event.fail.description, result: event.fail.result}))
        }
        return;
    }
    return (
        <>
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...'}</h5>
            <p>{event.description}</p>
            <button onClick={handleClick}>Let's try it!</button>
        </>
    );
};
