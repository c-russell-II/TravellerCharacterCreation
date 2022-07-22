import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { JobSkills } from "../../Skills/JobSkills";
import { resolveEvent } from "../../TermSlice/TermSlice";

const TableReward = (props) => {
    const term = useSelector(state => state.term);
    const dispatch = useDispatch();
    return (
        <>
            <p>{term.event.description}</p>
            <p>Select which variety of skills you will focus on in response:</p>
            <JobSkills cleanup={dispatch(resolveEvent())}/>
        </>
    )
}

export default TableReward;