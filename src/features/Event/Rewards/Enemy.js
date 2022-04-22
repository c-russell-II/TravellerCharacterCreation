import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { roll } from "../../Career/careerHandler";
import { addEnemy } from "../../Character/miscBonusSlice";
import { resolveEvent } from "../../Term/TermSlice";

const Enemy = (props) => {
    const {isMultiple} = props;
    const event = useSelector(state => state.term.event);
    const dispatch = useDispatch();

    let value = isMultiple? event.result.enemy.value : event.result.value
    const description = isMultiple ? event.result.enemy.description : event.result.description;

    const handleClick = (ev) => {
        ev.preventDefault();

        if (value === 'roll') {
            const num = isMultiple ? event.result.enemy.roll : event.result.roll
            value = roll(num);
        }
        dispatch(addEnemy({value: value, description: description}))
        if (!isMultiple) {
            dispatch(resolveEvent());
        }
        return;
    }
    return (
        <>
            <button onClick={handleClick}>Damn.</button>
        </>
    )
}

export default Enemy;