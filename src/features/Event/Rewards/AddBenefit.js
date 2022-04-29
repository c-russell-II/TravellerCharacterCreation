import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addBenefit } from "../../Career/careerSlice";
import { resolveEvent } from "../../Term/TermSlice";

const AddBenefit = (props) => {
    const {career} = useParams();
    const event = useSelector(state => state.term.event);
    const benefitCount = useSelector(state => state.careers[career].benefits)
    const dispatch = useDispatch();


    const firstValue = event.result.value;
    const value = firstValue === 'all' ? -1 * benefitCount : firstValue;

    const handleClick = (ev) => {
        ev.preventDefault();
        dispatch(addBenefit({job: career, value: value}))
        dispatch(resolveEvent());
        return;
    }
    return (
        <>
            <button onClick={handleClick}>{value > 0 ? 'Great.' : 'Damn.'}</button>
        </>
    )
}

export default AddBenefit;