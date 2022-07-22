import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { roll, skillCheck } from "../Career/careerHandler";
import { saveFailedTerm, saveSurvivedTerm } from "../Career/careerSlice";
import { addEvent } from "../Character/charaSlice";
import { JobSkills } from "../Skills/JobSkills";
import { failedTerm, survivedTerm } from "../TermSlice/TermSlice";
import { prisonSpecs } from "./Utilities/Prisoner";

const PrisonTerm = (props) => {
    const stats = useSelector(state => state.stats);
    const spec = useSelector(state=> state.prison.job);
    const [needSkills, setNeedSkills] = useState(true)
    const details = prisonSpecs[spec];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {survivalSkill, survivalDC} = details;

    const handleClick = (event) => {
        event.preventDefault();
        let surviveRoll = (skillCheck(stats[survivalSkill]))
        const surviveCheck = surviveRoll === 2 ? false : survivalDC <= surviveRoll;
        const mishap = details.mishapList[roll()]
        const jobEvent = details.eventList[roll() + roll() + 2];

        if (surviveCheck) {
            dispatch(survivedTerm({job: spec, event: jobEvent, jobDetails: details}));
            dispatch(saveSurvivedTerm({job: spec}))
            dispatch(addEvent(jobEvent))
            navigate('../survived')
            return;
        } else {
            dispatch(failedTerm({job: spec, event: mishap, jobDetails: details}));
            dispatch(saveFailedTerm({job: spec}))
            dispatch(addEvent(mishap));
            navigate('../failed')
            return;
        }
    }

    const cleanup = () => {setNeedSkills(false)};
    return (
        <>
            <h1>Staying afloat...</h1>
            {needSkills ?
                <JobSkills cleanup={cleanup}/>
            :
            <><p>Time to see how well you hold up in prison, in whatever fashion you've chosen to survive.</p>
            <button onClick={handleClick}>Keep Trying</button></>}
        </>
    )
}

export default PrisonTerm;