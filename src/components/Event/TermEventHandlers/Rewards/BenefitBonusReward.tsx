import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addBenefitBonus } from "../../../../features/Character/miscBonusSlice";
import { resolveEvent } from "../../../../features/TermSlice/TermSlice";
import { RootState } from "../../../../app/store";
import { BenefitBonusEventReward } from "../../../../features/CareerDetails/CareerTyping";

const BenefitBonusReward = (props: {result: BenefitBonusEventReward}) => {
    const result = props.result;
    const {career} = useParams();
    const dispatch = useDispatch();
    const value = result.value;

    if (!career) {
        console.warn("No career in url params for benefit bonus reward handler!");
        return <>how did you get here without a career in the url? im either very impressed or very annoyed</>
    }

    const handleClick = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        dispatch(addBenefitBonus({career: career as string, value: value}))
        dispatch(resolveEvent())
        return;
    }
    return (
        <>
            <button onClick={handleClick}>Great!</button>
        </>
    )
}

export default BenefitBonusReward;