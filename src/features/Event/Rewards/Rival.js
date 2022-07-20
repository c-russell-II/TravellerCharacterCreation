import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRival } from "../../Character/miscBonusSlice";
import { resolveEvent } from "../../Term/Utilities/TermSlice";

const Rival = (props) => {
    const event = useSelector(state => state.term.event);
    const dispatch = useDispatch();

    const value = event.result.value;
    const description = event.result.value;

    const handleClick = (ev) => {
        ev.preventDefault();
        dispatch(addRival({value: value, description: description}));
        dispatch(resolveEvent());
        return;
    }
    return (
        <>
            <button onClick={handleClick}>Damn.</button>
        </>
    )
}

export default Rival;