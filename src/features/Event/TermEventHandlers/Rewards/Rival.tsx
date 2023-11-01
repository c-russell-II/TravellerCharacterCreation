import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRival } from "../../../Character/miscBonusSlice";
import { resolveEvent } from "../../../TermSlice/TermSlice";
import { RivalEventReward } from "../../../CareerDetails/CareerTypes/EventRewardTypes";

const Rival = (props: {result: RivalEventReward}) => {
    const result = props.result;
    const dispatch = useDispatch();

    const handleClick = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        dispatch(addRival({value: result.value, description: result.description}));
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