import React from "react";

export const Passed = (props) => {
    const {job, currentTerm} = props;

    const rank = currentTerm.jobDetails.ranks[job[currentTerm.job.id].rank].title;
    const terms = job[currentTerm.job.id].terms;

    return (
        <div className="passNoAdv">
            <p>Your skills and aptitudes enable you to survive another term as a/an {currentTerm.job.title}. You have been walking this career path for {terms} years.</p>
            <p>However, you do not manage to stand out enough to receive a promotion, keeping you at {rank}.</p>
        </div>
    )
}

export const Advanced = (props) => {
    const {job, currentTerm} = props

    const rank = currentTerm.jobDetails.ranks[job[currentTerm.job.id].rank].title;
    const terms = job[currentTerm.job.id].terms;

    return (
        <div className='passAdv'>
            <p>Your skills and aptitudes enable you to survive another term as a/an {currentTerm.job.title}. You have been walking this career path for {terms} years.</p>
            <p>Your stand out performance and mastery of your tasks and responsibilities earn you a promotion. You are now {rank}.</p>
        </div>
    )
}

export const Failed = (props) => {
    const {job, currentTerm} = props

    const rank = currentTerm.jobDetails.ranks[job[currentTerm.job.id].rank].title;
    const terms = job[currentTerm.job.id].terms;

    return (
        <div className='failed'>
            <p>Your skills and aptitude were not, unfortunately, up to the demands of your work as a/an {currentTerm.job.title}.</p>
            <p>You leave this career at {rank} after {terms} years.</p>
        </div>
    )
}
