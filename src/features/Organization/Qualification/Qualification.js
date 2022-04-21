import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import jobObject, { parentJobs } from "../../Career/CareerDetails";
import { selectJob } from "../../Career/careerSlice";
import EntertainerQual from "./EntertainerQual";
import NobleQual from "./NobleQual";
import StandardQual from "./StandardQual";


const Qualification = (props) => {
    const education = useSelector(state => state.education);
    const {career} = useParams();
    const jobParent = parentJobs[jobObject[career].parent]
    const {qualificationStat} = jobParent;
    const [body, setBody] = useState();
    const dispatch = useDispatch();
    const specialty = jobObject[career]

    const milAcadHandler = useCallback(() => {
        dispatch(selectJob({job: career, details: specialty}))
        setBody(
            <>
                <p>Your success in the military academy guarantees you a slot in the {jobParent.title}'s training cadre for this term.</p>
                <Link to={`/term/${career}/start`}>Great!</Link>
            </>
        );

        return;
    }, [career, dispatch, jobParent.title, specialty]);
    useEffect(() => {
        if (jobParent.title === education.school) {
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
    }, [education.graduated, education.school, jobParent.title, milAcadHandler, qualificationStat])
    return (
        <>
            <h1>{jobParent.title} Qualification</h1>
            {body}
        </>
    )
}

export default Qualification;