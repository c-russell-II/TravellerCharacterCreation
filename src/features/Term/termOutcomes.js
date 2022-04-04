import React from "react";
import {useSelector} from 'react-redux';

export const Passed = (props) => {
    const jobDetails = props.job;
    const careerState = useSelector(state => state.careers);
    const currentCareer = careerState[jobDetails.id];
    return (
        <div className="passNoAdv">
            <p>Your skills and aptitudes enable you to survive another term as a/an {jobDetails.title}. You have been walking this career path for {currentCareer.terms} years.</p>
            <p>However, you do not manage to stand out enough to receive a promotion, keeping you at {jobDetails.ranks[currentCareer.rank].title}.</p>
        </div>
    )
}

export const Advanced = (props) => {
    const careerState = useSelector(state => state.careers);
    const jobDetails = props.job;
    const currentCareer = careerState[jobDetails.id]
    return (
        <div className='passAdv'>
            <p>Your skills and aptitudes enable you to survive another term as a/an {jobDetails.title}. You have been walking this career path for {currentCareer.terms} years.</p>
            <p>Your stand out performance and mastery of your tasks and responsibilities earn you a promotion. You are now {jobDetails.ranks[currentCareer.rank].title}.</p>
        </div>
    )
}

export const Failed = (props) => {
    const careerState = useSelector(state => state.careers);
    const jobDetails = props.job;
    const currentCareer = careerState[jobDetails.id]
    return (
        <div className='failed'>
            <p>Your skills and aptitude were not, unfortunately, up to the demands of your work as a/an {jobDetails.title}.</p>
            <p>You leave this career at {jobDetails.ranks[currentCareer.rank].title}, after {currentCareer.terms} years.</p>
        </div>
    )
}
