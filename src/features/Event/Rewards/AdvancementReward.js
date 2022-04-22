import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { advancementBonus, resolveEvent } from "../../Term/TermSlice";

const AdvancementReward = (props) => {
    const {isMultiple} = props;
    const event = useSelector(state => state.term.event);
    const dispatch = useDispatch();

    const handleClick = (ev) => {
        ev.preventDefault();
        if (isMultiple) {
            const value = event.result.advancement.value
            dispatch(advancementBonus(value));
            return;
        }
        const value = event.result.value;
        dispatch(advancementBonus(value));
        dispatch(resolveEvent());
        return;
    }

    return (
        <>
            <button onClick={handleClick}>Nice!</button>
        </>
    )
}

export default AdvancementReward;