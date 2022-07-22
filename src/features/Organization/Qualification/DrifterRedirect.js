import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jobObject, { parentJobs } from "../../CareerDetails/CareerDetails";

const DrifterRedirect = (props) => {
    const [specialty, setSpecialty] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        event.preventDefault();
        setSpecialty(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/term/${specialty}/start`)
    }

    return (
        <>
            <h1>Another Wanderer...</h1>
            <p>Having failed to qualify for your chosen career, now you wander Imperial space, aimless and purposeless.</p>
            <h2>Select your specialty:</h2>
            <p>This will be what you do to survive day-to-day, as you drift from planet to planet.</p>
            <form onSubmit={handleSubmit} name="specialty">
                {parentJobs.drifter.specialtiesList.map((e, i) => <label key={i}><input type="radio" name="specialty" value={e} onChange={handleChange} checked={specialty===e}/> {jobObject[e].title} </label>)}
                <input name="specialty" type="submit" value="submit"/>
            </form>
        </>
    )
}

export default DrifterRedirect;