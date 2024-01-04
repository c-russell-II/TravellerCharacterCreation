import React from "react";
import { useDispatch } from "react-redux";
import { promotion } from "../../../../features/Career/careerSlice";
import { resolveEvent } from "../../../../features/TermSlice/TermSlice";

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