import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { roll, skillCheck } from "../Career/careerHandler";
import { saveFailedTerm, saveSurvivedTerm } from "../Career/careerSlice";
import { addEvent } from "../Character/charaSlice";
import { JobSkills } from "../Skills/JobSkills";
import { failedTerm, survivedTerm } from "../TermSlice/TermSlice";
import { prisonSpecs } from "./Utilities/Prisoner";
import { RootState } from "../../app/store";
import { CareerSpecialty } from "../CareerDetails/CareerTyping";

const getSpec = (choice: string) => {
    switch (choice) {
        case "inmate":
            return prisonSpecs.inmate;
        case "thug":
            return prisonSpecs.thug;
        case "fixer":
            return prisonSpecs.fixer;
    }
};
const PrisonTerm = () => {
    const stats = useSelector((state: RootState) => state.stats);
    const spec = useSelector((state: RootState)=> state.prison.job);
    const [needSkills, setNeedSkills] = useState(true)
    const details = getSpec(spec) as CareerSpecialty;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {survivalSkill, survivalDC} = details;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let surviveRoll = (skillCheck(stats[survivalSkill as keyof StatDisplayHolder]))
        const surviveCheck = surviveRoll === 2 ? false : survivalDC <= surviveRoll;
        const mishap = details.mishapList[roll()]
        const jobEvent = details.eventList[roll() + roll() + 2];

        if (surviveCheck) {
            dispatch(survivedTerm({job: spec, event: jobEvent, jobDetails: details}));
            dispatch(saveSurvivedTerm({job: spec}))
            //TODO: Saving events to character state!
            // dispatch(addEvent(jobEvent))
            navigate('../survived')
            return;
        } else {
            dispatch(failedTerm({job: spec, event: mishap, jobDetails: details}));
            dispatch(saveFailedTerm({job: spec}))
            // dispatch(addEvent(mishap));
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