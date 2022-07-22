import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import jobObject from "../../CareerDetails/CareerDetails";
import { skillCheck } from "../../Career/careerHandler";
import { selectJob } from "../../Career/careerSlice";

const NobleQual = (props) => {
    const displaySoc = useSelector(state => state.stats.displayValues.soc);
    const soc = useSelector(state => state.stats.soc);
    const previousCareers = useSelector(state => state.careers.careerCount);
    const allBonuses = useSelector(state => state.misc.qualification);
    const {career} =useParams();
    const specialty = jobObject[career]
    const [auto, setAuto] = useState(false);
    const navigate = useNavigate();
    const currentDC = 10 + previousCareers;
    const dispatch = useDispatch();
    const qualBonus = career in allBonuses ? allBonuses[career].value : 0;
    useEffect(() => {
        if (displaySoc >= 10) {
            setAuto(true);
            dispatch(selectJob({job: career, details: specialty}))
        }
    }, [career, dispatch, displaySoc, specialty])
    const handleClick= () => {
        const outcome = currentDC <= skillCheck(soc) + qualBonus;
        if (outcome) {
            dispatch(selectJob({job: career, details: specialty}))
            navigate(`/term/${career}/start`)
        }
        navigate(`../qualification/${career}/failed`)

    }
    return (
        <>
            {auto ? 
                <><p>Your high social standing- equivalent, at least, to an Imperial Knight's own standing - guarantees you a foot in the door to your chosen career.</p><Link to={`/term/${career}/start`}>Fantastic!</Link></>
                : <><p>Your social standing is not even that of a lesser noble, and that means you must earn your career on the merit of your political and social manoeuvrings.</p><button onClick={handleClick}>Try it.</button></>
            
            }
        </>
    )
}

export default NobleQual;