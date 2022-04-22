import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { roll } from "../../Career/careerHandler";
import { addAlly } from "../../Character/miscBonusSlice";
import { resolveEvent } from "../../Term/TermSlice";

const Ally = (props) => {
    const {isMultiple} = props;
    const event = useSelector(state => state.term.event);
    const dispatch = useDispatch();

    let value = isMultiple? event.result.ally.value : event.result.value
    const description = isMultiple ? event.result.ally.description : event.result.description;

    const handleClick = (ev) => {
        ev.preventDefault();

        if (value === 'roll') {
            const num = isMultiple ? event.result.ally.roll : event.result.roll
            value = roll(num);
        }
        dispatch(addAlly({value: value, description: description}))
        if (!isMultiple) {
            dispatch(resolveEvent());
        }
        return;
    }
    return (
        <>
            <button onClick={handleClick}>Great!</button>
        </>
    )
}

export default Ally;