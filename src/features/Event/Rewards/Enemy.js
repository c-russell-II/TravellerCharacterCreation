import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { roll } from "../../Career/careerHandler";
import { addEnemy } from "../../Character/miscBonusSlice";
import { resolveEvent } from "../../Term/TermSlice";

const Enemy = (props) => {
    const event = useSelector(state => state.term.event);
    const dispatch = useDispatch();

    let value = event.result.value
    const description = event.result.description;

    const handleClick = (ev) => {
        ev.preventDefault();

        if (value === 'roll') {
            const num =  event.result.roll
            value = roll(num);
        }
        dispatch(addEnemy({value: value, description: description}))
        dispatch(resolveEvent());
        return;
    }
    return (
        <>
            <button onClick={handleClick}>Damn.</button>
        </>
    )
}

export default Enemy;