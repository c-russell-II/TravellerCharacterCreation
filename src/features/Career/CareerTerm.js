import React, { useEffect } from "react";
import jobObject from "./CareerDetails";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { roll, skillCheck } from "./careerHandler";
import { setCurrentTerm } from "../Term/TermSlice";

// carrer handler function
const CareerTerm = (props) => {
    const {career} = useParams();
    const stats = useSelector(state => state.stats);
    const dispatch = useDispatch();

    const {cleanup} = props;

    const {survivalSkill, advancementSkill, survivalDC, advancementDC} = jobObject[career];
    const surviveCheck = survivalDC <= skillCheck(stats[survivalSkill]);
    const mishapRoll = roll();
    const eventRoll = roll() + roll() + 2;
    const advanceCheck = advancementDC <= skillCheck(stats[advancementSkill]);


    useEffect(() => {
        if (surviveCheck) {
            dispatch(setCurrentTerm({
                job: career,
                jobDetails: jobObject[career],
                event: jobObject[career].eventList[eventRoll],
                survived: true,
                advanced: advanceCheck
            }))
            cleanup()
            return;
        } else {
            dispatch(setCurrentTerm({
                job: career,
                jobDetails: jobObject[career],
                event: jobObject[career].mishapList[mishapRoll],
                survive: false,
                advance: false,
            }))
            cleanup()
        }


    }, [advanceCheck, career, cleanup, dispatch, eventRoll, mishapRoll, surviveCheck])


    return (<></>);
};

export default CareerTerm;
