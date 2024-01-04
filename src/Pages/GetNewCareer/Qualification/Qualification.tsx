import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import jobObject, {
	parentJobs,
} from "../../../features/CareerDetails/CareerDetails";
import { selectJob } from "../../../features/Career/careerSlice";
import EntertainerQual from "./EntertainerQual";
import NobleQual from "./NobleQual";
import StandardQual from "./StandardQual";
import { RootState } from "../../../app/store";
import { ParentCareer } from "../../../features/CareerDetails/CareerTyping";


const Qualification = () => {
    const education = useSelector((state: RootState) => state.education);
    const {career} = useParams();
    const [body, setBody] = useState(<></>);
    const dispatch = useDispatch();
    if (!career) {
        console.warn("missing career in qual handler");
        //TODO: Error boundary for qual!
        return <>how did you get here? go back to the home :')</>
    }
    const jobParent = parentJobs[jobObject[career].parent] as ParentCareer
    const {qualificationStat, title} = jobParent;
    const specialty = jobObject[career]

    const milAcadHandler = useCallback(() => {
        dispatch(selectJob({job: career, details: specialty}))
        setBody(
            <>
                <p>Your success in the military academy guarantees you a slot in the {title}'s training cadre for this term.</p>
                <Link to={`/term/${career}/start`}>Great!</Link>
            </>
        );

        return;
    }, [career, dispatch, title, specialty]);
    useEffect(() => {
        if (title === education.school) {
            if (education.graduated) {
                milAcadHandler();
            }
        }

        switch (qualificationStat) {
            case 'choice':
                setBody(<EntertainerQual/>)
                return;
            case 'threshold':
                setBody(<NobleQual/>)
                return;
            default:
                setBody(<StandardQual/>)
                return;
        }
    }, [education.graduated, education.school, title, milAcadHandler, qualificationStat])
    return (
        <>
            <h1>{jobParent.title} Qualification</h1>
            {body}
        </>
    )
}

export default Qualification;