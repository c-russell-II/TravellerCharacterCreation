import React, {useEffect} from "react";
import {Link} from 'react-router-dom'
import { increaseStat } from "../Character/StatsSlice";
import { careerFuncs } from "../Career/careerHandler";
import { survivedTerm, advancedTerm, failedTerm } from '../Career/careerSlice';
import {Passed, Advanced, Failed} from './termOutcomes';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { Event } from "../Event/event";

export const Term = (props) => {
    const dispatch = useDispatch();
    const params = useParams();
    const career = params.career;

    const stats = useSelector(state => state.stats);
    const age = useSelector(state => state.stats.age);
    const currentJob = careerFuncs.job[career]

    // Runs a single term handler, saving the object it returns to a local variable, might be worth pulling the job data and such from redux just for organization..
    const termResults = careerFuncs.handler(currentJob, stats);
    useEffect(() => {  
        const jobAction = {job: currentJob.id, event: termResults.newEvent};

        if (termResults.survive && termResults.advance) {
            dispatch(advancedTerm(jobAction))
        } else if (termResults.survive) {
            dispatch(survivedTerm(jobAction));
        } else {
            dispatch(failedTerm(jobAction))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }}, [age])

    const careers = useSelector(state => state.careers);
    const jobs = careers[currentJob];
    const responseBuilder = (currentTerm) => {
        if (currentTerm.survive) {
            if (currentTerm.advance) {
                return (
                    <div>
                        <Advanced job={currentJob} jobData={jobs}/>
                        <button onClick={() => {dispatch(increaseStat('age'))}}>Another term...</button> <br/>
                    </div>
                )
            } else {
                return (
                    <div>
                        <Passed job={currentJob} jobData={jobs}/>
                        <button onClick={() => {dispatch(increaseStat('age'))}}>Another term...</button> <br/>
                    </div>
                )
            }
        } else {
            return (
                <Failed job={currentJob} jobData={jobs}/>
            )
        }
    };
    return (
        <div className="term">
            <h2>{currentJob.title}</h2>
            {responseBuilder(termResults)}
            <br/>
            {/* <Event event={termResults.newEvent}/> */}
            <p>You are currently {age} years old</p>
            <Link to="/choose_career">Choose a new career.</Link>
            <br/>
            <Link to="/">Home...</Link>
        </div>
    )
}