import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addBenefit } from "../../Career/careerSlice";
import { resolveEvent } from "../../Term/TermSlice";

const AddBenefit = (props) => {
    const {career} = useParams();
    const event = useSelector(state => state.term.event);
    const benefitCount = useSelector(state => state.career[career].benefitCount)
    const {isMultiple} = props;
    const dispatch = useDispatch();


    const firstValue = isMultiple? event.result.addBenefit.value : event.result.value;
    const value = firstValue === 'all' ? -1 * benefitCount : firstValue;

    const handleClick = (ev) => {
        ev.preventDefault();

        dispatch(addBenefit({career: career, value: value}))
        if (!isMultiple) {
            dispatch(resolveEvent());
        }
        return;
    }
    return (
        <>
            <button onClick={handleClick}>{value > 0 ? 'Great.' : 'Damn.'}</button>
        </>
    )
}

export default AddBenefit;