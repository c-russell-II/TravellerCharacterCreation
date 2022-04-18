import React from "react";
import { skillCheck } from "../Career/careerHandler";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../Term/TermSlice";

export const ChoiceCheckEvent = (props) => {
    const dispatch = useDispatch();
    const term = useSelector(state => state.term);
    const skills = useSelector(state => state.skills);

    const dc = term.event.checkDC;
    const list = term.event.choiceList;

    const handleClick = (choice) => {
        const skill = skills[choice];
        const result = dc <= skillCheck(skill);
        if (result) {
            dispatch(updateEvent({type: 'reward', description: term.event.description + ' ' + term.event.pass.description, result: term.event.pass.result}));
            return;
        } else {
            dispatch(updateEvent({type: 'reward', description: term.event.description + ' ' + term.event.fail.description, result: term.event.fail.description}));
        }
    };
    return (
        <>
            <h5>{!term.survive ? "This year's disaster..." : 'This year in your life...'}</h5>
            <p>{term.event.description}</p>
            {list.map((e, i) => {
                return (
                    <button onClick={() => { handleClick(e)}} key={i}>Use {e}</button>
                );
            })}
        </>
    );
};