import React from "react";
import { useDispatch } from "react-redux";
import { roll } from "../Career/careerHandler";
import { selectJob } from "../Career/careerSlice";
import { failedTerm } from "../Term/TermSlice";
import { fixer, inmate, prisonSpecs, thug } from "./Prisoner";
import { enterPrison } from "./prisonSlice";

const PrisonSpecialties = (props) => {
    const dispatch = useDispatch();
    const handleClick = (choice) => {
        dispatch(enterPrison({job: choice, parole: roll() + 5}));
        dispatch(selectJob({job: choice, details: prisonSpecs[choice]}))
        dispatch(failedTerm({job: choice, event: {}, details: prisonSpecs[choice]}))
        props.cleanup();
    }

    return (
        <>
            <p>Decide how you will survive your time in prison:</p>
            <div className="pris_specialty">
                <h2>{inmate.title}</h2>
                <p>{inmate.description}</p>
                <button onClick={handleClick('inmate')}>Select</button>
            </div>
            <div className="pris_specialty">
                <h2>{thug.title}</h2>
                <p>{thug.description}</p>
                <button onClick={handleClick('thug')}>Select</button>
            </div>
            <div className="pris_specialty">
                <h2>{fixer.title}</h2>
                <p>{fixer.description}</p>
                <button onClick={handleClick('fixer')}>Select</button>
            </div>
        </>
    )
}

export default PrisonSpecialties;