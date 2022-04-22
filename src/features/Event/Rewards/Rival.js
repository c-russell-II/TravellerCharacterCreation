import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRival } from "../../Character/miscBonusSlice";
import { resolveEvent } from "../../Term/TermSlice";

const Rival = (props) => {
    const {isMultiple} = props;
    const event = useSelector(state => state.term.event);
    const dispatch = useDispatch();

    const value = isMultiple ? event.result.rival.value : event.result.value;
    const description = isMultiple ? event.result.rival.description : event.result.value;

    const handleClick = (ev) => {
        ev.preventDefault();

        dispatch(addRival({value: value, description: description}));
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

export default Rival;