import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../../Term/TermSlice";

const MultipleChoice = (props) => {
    const event = useSelector(state => state.term.event)
    const dispatch = useDispatch();

    const handleClick = (choice) => {
        dispatch(updateEvent(event.result[choice]))
        return;
    }
    return (
        <>
            {event.result.list.map((e, i) => {
                return <button key={i} onClick={() => handleClick(e)}>{event.result[e].button}</button>
            })}
        </>
    )
}

export default MultipleChoice;