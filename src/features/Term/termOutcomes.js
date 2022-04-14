import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const Passed = (props) => {
    const {career} = useParams();
    const careerState = useSelector(state => state.careers);
    const term = useSelector(state => state.term);
    const rank = term.jobDetails.ranks[careerState[career].rank].title;
    const terms = careerState[career].terms;

    return (
        <div className="passNoAdv">
            <p>Your skills and aptitudes enable you to survive another term as a/an {term.jobDetails.title}. You have been walking this career path for {terms} years.</p>
            <p>However, you do not manage to stand out enough to receive a promotion, keeping you at {rank}.</p>
        </div>
    )
}

export const Advanced = (props) => {
    const {career} = useParams();
    const careerState = useSelector(state => state.careers);
    const term = useSelector(state => state.term);
    const rank = term.jobDetails.ranks[careerState[career].rank].title;
    const terms = careerState[career].terms;

    return (
        <div className='passAdv'>
            <p>Your skills and aptitudes enable you to survive another term as a/an {term.jobDetails.title}. You have been walking this career path for {terms} years.</p>
            <p>Your stand out performance and mastery of your tasks and responsibilities earn you a promotion. You are now {rank}.</p>
        </div>
    )
}

export const Failed = (props) => {
    const {career} = useParams();
    const careerState = useSelector(state => state.careers);
    const term = useSelector(state => state.term);
    const rank = term.jobDetails.ranks[careerState[career].rank].title;
    const terms = careerState[career].terms;

    return (
        <div className='failed'>
            <p>Your skills and aptitude were not, unfortunately, up to the demands of your work as a/an {term.jobDetails.title}.</p>
            <p>You leave this career at {rank} after {terms} years.</p>
        </div>
    )
}
