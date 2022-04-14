import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from '../Character/charaSlice';
import Popup from 'reactjs-popup';
import { resolveEvent } from "../Term/TermSlice";

export const Choice = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [choice, setChoice] = useState('');
    const dispatch = useDispatch();
    const { helper } = props;
    const event = useSelector(state => state.term.event);
    const list = event.choiceList;

    const handleClick = (choice) => {
        setChoice(choice);
        const localEvent = { ...event, choice: choice };
        dispatch(addEvent(localEvent));

        return (helper(event[choice].type, setIsActive));
    };
    return (
        <Popup
            open={isOpen}
            modal
        >
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...'}</h5>
            <p>{event.description}</p>
            {isActive &&
                <div>
                    <p>{event[choice].description}</p>
                    <button onClick={() => {setIsOpen(false); dispatch(resolveEvent());}}>{'Onwards!'}</button>
                </div>}
            {!isActive &&
                list.map((e, i) => {
                    return (
                        <button key={i} onClick={() => handleClick(e)}>{props.event[e].button}</button>
                    );
                })}
        </Popup>
    );
};
