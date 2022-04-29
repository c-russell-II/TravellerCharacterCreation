import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { roll } from "../../Career/careerHandler";
import { addAlly } from "../../Character/miscBonusSlice";
import { resolveEvent } from "../../Term/TermSlice";

const Ally = (props) => {
    const event = useSelector(state => state.term.event);
    const dispatch = useDispatch();

    let value = event.result.value
    const description = event.result.description;

    const handleClick = (ev) => {
        ev.preventDefault();
        if (value === 'roll') {
            value = roll(event.result.roll);
        }
        dispatch(addAlly({value: value, description: description}))
        dispatch(resolveEvent());
        return;
    }
    return (
        <>
            <button onClick={handleClick}>Great!</button>
        </>
    )
}

export default Ally;