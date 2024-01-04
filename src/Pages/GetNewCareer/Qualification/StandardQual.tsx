import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import jobObject, {
	parentJobs,
} from "../../../features/CareerDetails/CareerDetails";
import {
	getQualBonus,
	skillCheck,
} from "../../../features/Career/careerHandler";
import { selectJob } from "../../../features/Career/careerSlice";
import { RootState } from "../../../app/store";
import { ParentCareer } from "../../../features/CareerDetails/CareerTyping";

const StandardQual = () => {
    const stats = useSelector((state: RootState) => state.stats);
    const previousCareers = useSelector((state: RootState) => state.careers.careerCount);
    const allBonuses = useSelector((state: RootState) => state.misc.qualification);
    const [ready, setReady] = useState(false);
    const [passed, setPassed] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {career} = useParams();

    if (!career) {
        console.warn("missing career in qual handler");
        return <>how did you get here - go back please</>
    }
    const details = jobObject[career];
    const parent = parentJobs[details.parent] as ParentCareer;
    const qualBonus = getQualBonus(allBonuses, career);

    const handleClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        let ageMod = 0
        if ('qualificationAge' in parent) {
            ageMod = stats.age > parent.qualificationAge ? 2 : 0
        }
        const checkDC = parent.qualificationDC ? parent.qualificationDC : 7;
        if (skillCheck(stats[parent.qualificationStat as keyof StatDisplayHolder]) + qualBonus >= checkDC + previousCareers + ageMod) {
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