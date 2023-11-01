import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import jobObject from "../../CareerDetails/CareerDetails";
import { roll } from "../../Career/careerHandler";
import { selectJob } from "../../Career/careerSlice";
import { setDrafted } from "../../Character/charaSlice";
import { getParentCareer } from "../../Career/careerHandler";

interface ResultState {
    career: null | string;
    specialty: null | string;
    title?: string;
}
const DraftHandler = () => {
    const [result, setResult] = useState<ResultState>({career: null, specialty: null});
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

    const fireDraft = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(setDrafted());
        const index = roll() - 1;
        setResult(careerArray[index])
    }

    const handleRedirect = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!result.specialty) {
            console.warn("Redirect handler fired without a selected specialty. This shouldn't happen, but it did.")
            return;
        }
        dispatch(selectJob({job: result.specialty, details: jobObject[result.specialty]}))
        navigate(`/term/${result.specialty}/start`)
    }

    const specialtySubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setResult(prev => {return {...prev, specialty: specialty}})

    }

    const specialtyChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSpecialty(event.currentTarget.value);
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
                            {getParentCareer(result.specialty).specialtiesList.map((e, i) => 
                                <label key={i}><input type="radio" name="specialty" onChange={specialtyChange} checked={specialty===e} value={e}/>{e}</label>
                            )}
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