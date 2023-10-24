import React from "react";
import { useDispatch } from "react-redux";
import { advancementBonus, resolveEvent } from "../../TermSlice/TermSlice";
import { AdvancementEventReward } from "../../CareerDetails/CareerTypes/EventRewardTypes";

const AdvancementReward = (props: {result: AdvancementEventReward}) => {
    const result = props.result;
    const dispatch = useDispatch();

    const handleClick = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        const value = result.value;
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