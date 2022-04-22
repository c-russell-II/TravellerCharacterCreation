import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addBenefitBonus } from "../../Character/miscBonusSlice";
import { resolveEvent } from "../../Term/TermSlice";

const BenefitBonusReward = (props) => {
    const {isMultiple} = props;
    const event = useSelector(state => state.term.event);
    const {career} = useParams();
    const dispatch = useDispatch();
    const value = isMultiple ? event.result.benefit.value : event.result.value;

    const handleClick = (ev) => {
        ev.preventDefault();
        dispatch(addBenefitBonus({career: career, value: value}))
        if (!isMultiple) {
            dispatch(resolveEvent())
        }
        return;
    }
    return (
        <>
            <button onClick={handleClick}>Great!</button>
        </>
    )
}

export default BenefitBonusReward;