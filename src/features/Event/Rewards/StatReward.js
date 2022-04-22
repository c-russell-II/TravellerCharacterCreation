import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeByAmount } from "../../Character/StatsSlice";
import { resolveEvent } from "../../Term/TermSlice";

const StatReward = (props) => {
    const {isMultiple} = props;
    const event = useSelector(state => state.term.event);
    const dispatch = useDispatch();
    const value = isMultiple ? event.result.stat.value : event.result.value;

    const handleClick = (ev) => {
        ev.preventDefault();
        if (isMultiple) {
            const stat = event.result.stat;
            dispatch(changeByAmount({stat: stat, value: value}))
            return;
        }
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