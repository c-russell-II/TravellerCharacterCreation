import React from "react";
import { useDispatch } from "react-redux";
import { roll } from "../Career/careerHandler";
import { selectJob } from "../Career/careerSlice";
import { failedTerm } from "../TermSlice/TermSlice";
import { fixer, inmate, prisonSpecs, thug } from "./Utilities/Prisoner";
import { enterPrison } from "./Utilities/prisonSlice";
import { CareerSpecialty } from "../CareerDetails/CareerTyping";

const PrisonSpecialties = (props: {cleanup: () => void}) => {
    const dispatch = useDispatch();

    const getSpec = (choice: string) => {
        switch(choice) {
            case 'inmate':
                return prisonSpecs.inmate;
            case 'thug':
                return prisonSpecs.thug;
            case 'fixer':
                return prisonSpecs.fixer;
        }
    }
    const handleClick = (choice: string) => {
        dispatch(enterPrison({job: choice, parole: roll() + 5}));
        dispatch(selectJob({job: choice, details: getSpec(choice) as CareerSpecialty}))
        // dispatch(failedTerm({job: choice, event: , details: getSpec(choice)}))
        //TODO: dont know if i need this dispatch, check the book
        props.cleanup();
    }

    return (
        <>
            <p>Decide how you will survive your time in prison:</p>
            <div className="pris_specialty">
                <h2>{inmate.title}</h2>
                <p>{inmate.description}</p>
                <button onClick={() => handleClick('inmate')}>Select</button>
            </div>
            <div className="pris_specialty">
                <h2>{thug.title}</h2>
                <p>{thug.description}</p>
                <button onClick={() => handleClick('thug')}>Select</button>
            </div>
            <div className="pris_specialty">
                <h2>{fixer.title}</h2>
                <p>{fixer.description}</p>
                <button onClick={() => handleClick('fixer')}>Select</button>
            </div>
        </>
    )
}

export default PrisonSpecialties;