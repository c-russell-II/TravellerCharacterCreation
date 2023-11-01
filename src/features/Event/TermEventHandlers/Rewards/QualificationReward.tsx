import React from "react";
import { useDispatch, useSelector } from "react-redux";
import jobObject from "../../../CareerDetails/CareerDetails";
import { addQualificationBonus } from "../../../Character/miscBonusSlice";
import { resolveEvent } from "../../../TermSlice/TermSlice";
import { QualificationEventReward } from "../../../CareerDetails/CareerTypes/EventRewardTypes";
import { RootState } from "../../../../app/store";

const QualificationReward = (props: {result: QualificationEventReward}) => {
    const result = props.result;
    const dispatch = useDispatch();
    const age = useSelector((state: RootState) => state.stats.age);

    const value = result.value;

    const handleClick = (ev: React.SyntheticEvent<HTMLButtonElement>) => {
        ev.preventDefault();
        let careers: string[] = [];
        if (result.career === 'any') {
            Object.keys(jobObject).forEach(e=> careers.push(e))
        } else if (Array.isArray(result.career)) {
            careers = result.career;
        } else {
            //TODO: need to do a thorough check of typing for qualification event reward! might have a single 
            return;
        }

        dispatch(addQualificationBonus({careers: careers, value: value, age: age + 4, isTemp: true}));
        dispatch(resolveEvent());
        return;
    }
    return (
        <>
            <button onClick={handleClick}>Okay.</button>
        </>
    )
}

export default QualificationReward;