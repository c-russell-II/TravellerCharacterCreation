import React from "react";
import { useDispatch } from "react-redux";
import { promotion } from "../../Career/careerSlice";
import { resolveEvent } from "../../TermSlice/TermSlice";

const PromotionReward = () => {
    const dispatch = useDispatch();

    const handleClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(promotion());
        dispatch(resolveEvent())
    }
    return (
        <>
            <button onClick={handleClick}>Great!</button>
        </>
    )
}

export default PromotionReward;