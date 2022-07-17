import React from "react";
import { useDispatch } from "react-redux";
import { promotion } from "../../Career/careerSlice";
import { resolveEvent } from "../../Term/Utilities/TermSlice";

const PromotionReward = (props) => {
    const dispatch = useDispatch();

    const handleClick = (event) => {
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