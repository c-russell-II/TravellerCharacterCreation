import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../Term/TermSlice";

export const Choice = (props) => {
    const dispatch = useDispatch();
    const event = useSelector(state => state.term.event);
    const list = event.choiceList;

    const handleClick = (choice) => {
        dispatch(updateEvent({type: 'reward', description: event.description + ' ' + event[choice].description, result: event[choice].result}));
    };
    return (
        <>
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...'}</h5>
            <p>{event.description}</p>
            {list.map((e, i) => {
                return (
                    <button key={i} onClick={() => handleClick(e)}>{event[e].button}</button>
                );
            })}
        </>
    );
};