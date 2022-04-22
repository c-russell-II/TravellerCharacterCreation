import React from "react";
import { useDispatch, useSelector } from "react-redux";
import jobObject from "../../Career/CareerDetails";
import { addQualificationBonus } from "../../Character/miscBonusSlice";
import { resolveEvent } from "../../Term/TermSlice";

const QualificationReward = (props) => {
    const {isMultiple} = props;
    const event = useSelector(state => state.term.event);
    const dispatch = useDispatch();
    const age = useSelector(state => state.stats.age);

    const value = isMultiple ? event.result.qualification.value : event.result.value;

    const handleClick = (ev) => {
        ev.preventDefault();
        let careers = [];
        if (isMultiple) {
            if (event.result.qualification.career === 'any') {
                Object.keys(jobObject).forEach(e => careers.push(e))
            } else {
                careers.push(event.result.qualification.career)
            }
        } else {
            if (event.result.career === 'any') {
                Object.keys(jobObject).forEach(e=> careers.push(e))
            } else {
                careers.push(event.result.career);
            }
        }

        dispatch(addQualificationBonus({careers: careers, value: value, age: age + 4, isTemp: true}));
        if (!isMultiple) {
            dispatch(resolveEvent());
        }
        return;
    }
    return (
        <>
            <button onClick={handleClick}>Okay.</button>
        </>
    )
}

export default QualificationReward;