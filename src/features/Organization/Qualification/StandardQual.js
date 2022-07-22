import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import jobObject, { parentJobs } from "../../CareerDetails/CareerDetails";
import { skillCheck } from "../../Career/careerHandler";
import { selectJob } from "../../Career/careerSlice";

const StandardQual = (props) => {
    const stats = useSelector(state => state.stats);
    const previousCareers = useSelector(state => state.careers.careerCount);
    const allBonuses = useSelector(state => state.misc.qualification);
    const {career} = useParams();
    const [ready, setReady] = useState(false);
    const [passed, setPassed] = useState(false);
    const details = jobObject[career];
    const parent = parentJobs[details.parent];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const qualBonus = career in allBonuses ? allBonuses[career].value : 0;

    const handleClick = (event) => {
        event.preventDefault();
        let ageMod = 0
        if ('qualificationAge' in parent) {
            ageMod = stats.age > parent.qualificationAge ? 2 : 0
        }
        if (skillCheck(stats[parent.qualificationStat]) + qualBonus >= parent.qualificationDC + previousCareers + ageMod) {
            setReady(true);
            setPassed(true);
            dispatch(selectJob({job: career, details: details}))
            return;
        }
        navigate(`../qualification/${career}/failed`)
    }
    return (
        <>
        {!ready &&
            <>
                <p>In order to earn your place as a/an {details.title} requires you to prove yourself, using whatever abilities are relevant to that career's demands and expectations.</p>
            <button onClick={handleClick}>Try it</button>
        </>}
        {passed &&
            <>
                <p>In the initial aptitude and profiency training, you manage to prove yourself. The people administering the tests, interviews, or trials for your qualification welcome you to your new career.</p>
                <Link to={`/term/${career}/start`}>Great!</Link>
            </>
        }
        </>
    )
}

export default StandardQual;