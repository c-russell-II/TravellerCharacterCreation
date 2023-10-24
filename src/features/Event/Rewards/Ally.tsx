import React from "react";
import { useDispatch } from "react-redux";
import { roll } from "../../Career/careerHandler";
import { addAlly } from "../../Character/miscBonusSlice";
import { resolveEvent } from "../../TermSlice/TermSlice";
import { AllyEventReward } from "../../CareerDetails/CareerTypes/EventRewardTypes";

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