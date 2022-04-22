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
            {list.map((e, i) => {
                return (
                    <button key={i} onClick={() => handleClick(e)}>{event[e].button}</button>
                );
            })}
        </>
    );
};
