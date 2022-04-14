import React, { useState } from "react";
import { skillCheck } from "../Career/careerHandler";
import { useDispatch } from "react-redux";
import { addEvent } from '../Character/charaSlice';
import Popup from 'reactjs-popup';

export const ChoiceCheckEvent = (props) => {
    const [isActive, setIsActive] = useState(false);
    const [passed, setPassed] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();

    const { event, skills, handler } = props;

    const dc = event.checkDC;
    const list = event.choiceList;

    const checkPassed = () => {
        if (passed) {
            return handler(event.pass.result, setIsActive);
        } else {
            return handler(event.fail.result, setIsActive);
        }
    };

    const handleClick = (choice) => {
        const skill = skills[choice];
        const result = dc <= skillCheck(skill);
        event.passed = result;
        setPassed(result);
        return checkPassed();
    };
    return (
        <Popup
            open={isOpen}
            modal
        >
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...'}</h5>
            <p>{props.event.description}</p>
            {list.map((e, i) => {
                return (
                    <button onClick={() => { handleClick(e); }} key={i}>Use {e}</button>
                );
            })}
            {isActive &&
                <>
                    <p>{passed ? event.pass.description : event.fail.description}</p>

                    <button onClick={() => { setIsOpen(false); dispatch(addEvent(event)); }}>{passed ? 'Well done!' : 'Too bad...'}</button>
                </>}
        </Popup>
    );
};
