import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { roll } from "../../../../features/Career/careerHandler";
import { addEnemy } from "../../../../features/Character/miscBonusSlice";
import { resolveEvent } from "../../../../features/TermSlice/TermSlice";
import { RootState } from "../../../../app/store";
import { EnemyEventReward } from "../../../../features/CareerDetails/CareerTypes/EventRewardTypes";

const Enemy = (props: {result: EnemyEventReward}) => {
    const result = props.result;
    const dispatch = useDispatch();
    let value = result.value
    const description = result.description;

    const handleClick = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        const deets = ''
        if (value === 'roll') {
            const num =  result.roll
            //TODO: check what's going on here - I'm not sure why I have some string typed result.roll stuff!
            if (typeof num !== 'number') {
                value = 1;
            } else {
                value = roll(num);
            }
        }
        if (!value) value = 1;
        dispatch(addEnemy({value: value, description: description}))
        dispatch(resolveEvent());
        return;
    }
    return (
        <>
            <h4>A new enemy...</h4>
            <p>{description}</p>
            <button onClick={handleClick}>Damn.</button>
        </>
    )
}

export default Enemy;