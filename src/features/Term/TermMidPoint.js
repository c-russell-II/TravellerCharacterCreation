import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { survivedTerm, advancedTerm, failedTerm } from '../Career/careerSlice';
import { Term } from "./termRender";

export const TermMidPoint = (props) => {
    const {stats, currentTerm} = props;
    const age = stats.age;
    const dispatch = useDispatch();
    
    useEffect(() => {
        const jobAction = {job: currentTerm.job.id, event: currentTerm.newEvent};

        if (currentTerm.survive && currentTerm.advance) {
            dispatch(advancedTerm(jobAction))
        } else if (currentTerm.survive) {
            dispatch(survivedTerm(jobAction));
        } else {
            dispatch(failedTerm(jobAction))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }}, [age])
    return (
        <div>
            <Term currentTerm={currentTerm} job={props.job} />
        </div>
    )
}