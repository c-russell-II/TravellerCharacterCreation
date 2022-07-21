import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrisonSpecialties from "../PrisonSpecialties";

const PrisonEntry = (props) => {
    const [pickSpecialty, setPickSpecialty] = useState(false);
    const [intro, setIntro] = useState(true);
    const [ready, setReady] = useState(false);
    const navigate = useNavigate();
    const cleanup = () => {setPickSpecialty(false); setReady(true);}
    const handleClick = () => {
        setIntro(false);
        setPickSpecialty(true);
        return;
    }
    return (
        <>
            <h1>Jailed!</h1>
            {intro &&
            <>
                <p>Whether due to your own carelessness, a misunderstanding, or the actions of an enemy or rival, you have been sent to jail.</p>
                <p>Each term, you will have a parole hearing- until you are granted parole by that hearing, you will be staying as a guest of the state.</p>
                <button onClick={handleClick}>Get on with it</button>
            </>}
            {pickSpecialty && <PrisonSpecialties cleanup={cleanup}/>}
            {ready && <button onClick={navigate('../start')}>Keep moving</button>}
        </>
    )
}

export default PrisonEntry;