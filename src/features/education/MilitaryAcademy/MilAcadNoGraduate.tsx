import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import jobObject, { parentJobs } from "../../CareerDetails/CareerDetails";
import { selectJob } from "../../Career/careerSlice";
import { getParentCareer } from "../../Career/careerHandler";

const MilAcadNoGraduate = () => {
    const {branch} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [intro, setIntro] = useState(true);
    const [pickSpec, setPickSpec] = useState(false);

    const militaryHandler = () => {
        setPickSpec(true);
        setIntro(false);
        return;
    }
    const handleSpecialty = (spec: string) => {
        dispatch(selectJob({job: spec, details: jobObject[spec]}));
        navigate(`/term/${spec}/start`)
    }

    const careerHandler = () => {
        navigate('/choose_career')
        return;
    }

    return (
        <>
            <h3>You failed to graduate...</h3>
            {intro && <>
            <p>Whether it was due to a lack of proper focus, outside intervention, or some combination of the two, you do not manage to graduate this term.</p>
            <p>However, should you decide to enlist in your chosen branch nonetheless, you do still qualify for automatic entry.</p>
            <button onClick={militaryHandler}>Enlist!</button><button onClick={careerHandler}>Find a new path</button> </>}
            {pickSpec && <>
                <p>Having chosen to continue with your plans for the military, now you must decide your specific career path.</p>
                {getParentCareer(branch as string).specialtiesList.map((e: string, i: number) => <button key={`button for ${e}`} onClick={(event) => handleSpecialty(e)}>{jobObject[e].title}</button>)}
            </>
            }
        </>
    )
}

export default MilAcadNoGraduate;