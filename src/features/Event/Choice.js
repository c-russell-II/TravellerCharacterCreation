import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from '../Character/charaSlice';
import Popup from 'reactjs-popup';

export const Choice = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [choice, setChoice] = useState('');
    const dispatch = useDispatch();
    const { event, helper } = props;
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
            <p>{props.event.description}</p>
            {isActive &&
                <div>
                    <p>{props.event[choice].description}</p>
                    <button onClick={() => setIsOpen(false)}>{'Onwards!'}</button>
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
