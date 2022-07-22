import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeByAmount } from "../../Character/StatsSlice";
import { resolveEvent } from "../../TermSlice/TermSlice";

const StatReward = (props) => {
    const event = useSelector(state => state.term.event);
    const dispatch = useDispatch();
    const value = event.result.value;

    const handleClick = (ev) => {
        ev.preventDefault();
        dispatch(changeByAmount({stat: event.result.stat, value: value}))
        dispatch(resolveEvent());
        return;
    }
    return (
        <>
            <button onClick={handleClick}>{value > 0 ? 'Great!' : 'Damn.'}</button>
        </>
    )
}

export default StatReward;