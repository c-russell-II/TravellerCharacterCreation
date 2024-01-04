import React from "react";
import { useDispatch } from "react-redux";
import { roll } from "../../../../features/Career/careerHandler";
import { addAlly } from "../../../../features/Character/miscBonusSlice";
import { resolveEvent } from "../../../../features/TermSlice/TermSlice";
import { AllyEventReward } from "../../../../features/CareerDetails/CareerTypes/EventRewardTypes";

const Ally = (props: {result: AllyEventReward}) => {
    const result = props.result;
    const dispatch = useDispatch();
    let value = result.value
    const description = result.description;

    const handleClick = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        //TODO: value of 'roll' for allies gained in event rewards
        // if (value === 'roll') {
        //     value = roll(event.result.roll);
        // }
        dispatch(addAlly({value: value, description: description}))
        dispatch(resolveEvent());
        return;
    }
    return (
        <>
            <button onClick={handleClick}>Great!</button>
        </>
    )
}

export default Ally;