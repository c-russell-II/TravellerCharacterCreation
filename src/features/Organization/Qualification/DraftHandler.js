import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import jobObject, { parentJobs } from "../../CareerDetails/CareerDetails";
import { roll } from "../../Career/careerHandler";
import { selectJob } from "../../Career/careerSlice";
import { setDrafted } from "../../Character/charaSlice";

const DraftHandler = (props) => {
    const [result, setResult] = useState({career: null, specialty: null});
    const [specialty, setSpecialty] = useState('')
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const careerArray = [
        {career: 'navy', specialty: 'any', title: 'Imperial Navy'},
        {career: 'army', specialty: 'any', title: 'Imperial Army'},
        {career: 'marine', specialty: 'any', title: 'Imperial Marines'},
        {career: 'merchant', specialty: 'merchantMarine', title: 'Merchant Marine'},
        {career: 'scout', specialty: 'any', title: 'Imperial Scouts'},
        {career: 'agent', specialty: 'lawEnforcement', title: 'Imperial Law Officers'}
    ]

    const fireDraft = (event) => {
        event.preventDefault();
        dispatch(setDrafted());
        const index = roll();
        setResult(careerArray[index])
    }

    const handleRedirect = (event) => {
        event.preventDefault();
        dispatch(selectJob({job: result.specialty, details: jobObject[result.specialty]}))
        navigate(`/term/${result.specialty}/start`)
    }

    const specialtySubmit = (event) => {
        event.preventDefault();

        setResult(prev => {return {...prev, specialty: specialty}})

    }

    const specialtyChange = (event) => {
        event.preventDefault();
        setSpecialty(event.target.value);
    }

    return (
        <>
            <h1>Entering the Draft...</h1>
            {!result.career ?
            <>
                <p>Having failed to enter your first choice of career, you submitted your name to the Imperial Draft.
                    Now your fate is in the hands of the Draft lottery, and the needs of the Imperial Services.
                </p>
                <button onClick={fireDraft}>Get Assignment</button>
            </>
            :
            <>
                <p>The Imperial Draft Service decide to send you to the {result.title}.</p>
                {result.specialty === 'any' ?
                    <>
                        <p>The {result.title} offers you your choice of specialty during your term- or terms- with them.</p>
                        <form name="specialty" onSubmit={specialtySubmit}>
                            {parentJobs[result.career].specialtiesList.map((e, i) => <label key={i}><input type="radio" name="specialty" onChange={specialtyChange} checked={specialty===e} value={e}/>{e}</label>)}
                            <input type="submit" name="specialty" value="submit"/>
                        </form>
                    </>
                :
                    <>
                        <button onClick={handleRedirect}>Onward</button>
                    </>
                }
            </>
            }
        </>
    )
}

export default DraftHandler;