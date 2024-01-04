import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import jobObject from "../../../features/CareerDetails/CareerDetails";
import { skillCheck } from "../../../features/Career/careerHandler";
import { selectJob } from "../../../features/Career/careerSlice";
import { RootState } from "../../../app/store";
import { getQualBonus } from "../../../features/Career/careerHandler";

const NobleQual = () => {
    const displaySoc = useSelector((state: RootState) => state.stats.displayValues.soc);
    const soc = useSelector((state: RootState) => state.stats.soc);
    const previousCareers = useSelector(
		(state: RootState) => state.careers.careerCount
	);
    const allBonuses = useSelector(
		(state: RootState) => state.misc.qualification
	);

    const [auto, setAuto] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {career} =useParams();

    if (!career) {
        console.warn("Missing career in noble qual!")
        return <>go back, you're missing something</>
    }

    const specialty = jobObject[career]

    useEffect(() => {
        if (displaySoc >= 10) {
            setAuto(true);
            dispatch(selectJob({job: career, details: specialty}))
        }
    }, [career, dispatch, displaySoc, specialty])


    const currentDC = 10 + previousCareers;
    const qualBonus = getQualBonus(allBonuses, career);

    const handleClick= () => {
        const outcome = currentDC <= skillCheck(soc) + qualBonus;
        if (outcome) {
            dispatch(selectJob({job: career, details: specialty}))
            navigate(`/term/${career}/start`)
            return;
        }
        navigate(`../qualification/${career}/failed`);
        return;
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