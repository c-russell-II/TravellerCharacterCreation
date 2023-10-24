import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { changeByAmount } from "../../Character/StatsSlice";
import { resolveEvent } from "../../TermSlice/TermSlice";
import { RewardEvent } from "../../CareerDetails/CareerTyping";

const StatReward = () => {
    const event = useSelector((state: RootState) => state.term.event as RewardEvent);
    const dispatch = useDispatch();

    const handleClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
        if (event.result.type !== 'stat') {
            console.warn("Incorrect event type in stat reward handler");
            return;
        }
        ev.preventDefault();
        dispatch(changeByAmount({stat: event.result.stat as keyof StatDisplayHolder, value: event.result.value}))
        dispatch(resolveEvent());
        return;
    }
    if (event.result.type !== 'stat') {
        console.warn("Incorrect event type in stat reward handler");
        return <></>;
    }
    return (
        <>
            <button onClick={handleClick}>{event.result.value > 0 ? 'Great!' : 'Damn.'}</button>
        </>
    )
}

export default StatReward;