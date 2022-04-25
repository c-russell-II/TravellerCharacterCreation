import React, { useEffect, useState } from "react";
import jobObject from "../Career/CareerDetails";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { skillCheck, roll } from "../Career/careerHandler";
import { failedTerm, resolveTerm, survivedTerm } from "./TermSlice";
import { JobSkills } from "../Skills/JobSkills";
import { basicTraining } from "../Skills/SkillsSlice";
import { addEvent, anagathicEnd, anagathicsTerm, setTrained } from "../Character/charaSlice";
import { saveSurvivedTerm } from "../Career/careerSlice";
import AgeUp from "../Character/AgeHandlers/AgeUp";
import { ageUp } from "../Character/StatsSlice";

const CareerTerm = (props) => {
    const {career} = useParams();
    const stats = useSelector(state => state.stats);
    const anagathics = useSelector(state => state.chara.anagathics);
    const trained = useSelector(state=> state.skills.isTrained);
    const [skillSelect, setSkillSelect] = useState(false);
    const [needAgeing, setNeedAgeing] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [intro, setIntro] = useState(true);
    const [anagathicCrisis, setAnagathicCrisis] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const jobDetails = jobObject[career]
    const {survivalSkill, survivalDC} = jobDetails;

    const ageingCleanup = () => {
        setNeedAgeing(false);
        if (!intro && !skillSelect && !anagathicCrisis) {
            setIsReady(true);
        }
    }

    const anagathicCleanup = () => {
        setAnagathicCrisis(false);
        if (!intro && !skillSelect && !needAgeing) {
            setIsReady(true);
        }
    }

    useEffect(() => {
        if (stats.age > 34) {
            setNeedAgeing(true);
        }
    }, [stats.age])

    const handleReady = (event) => {
        event.preventDefault();
        setIntro(false);
        if (!trained) {
            const basicTrainingArray = jobDetails.skills.service.map(e => e.skill);
            dispatch(basicTraining(basicTrainingArray))
            dispatch(setTrained());
            if (!needAgeing && !anagathicCrisis) {
                setIsReady(true);
            }
            return;
        }
        setSkillSelect(true);
    }

    const stopAnagathics = (event) => {
        event.preventDefault();
        dispatch(anagathicEnd());
        setAnagathicCrisis(true);
    }

    const anagathicCheck = (event) => {
        event.preventDefault();

        const rollVal = skillCheck();
        if (rollVal === 2) {
            alert('You were caught, and jailed, attempting to get highly illegal anagathics!')
            dispatch(ageUp());
            dispatch(resolveTerm());
            navigate('/prisoner/');
        }
        if (rollVal + stats.soc >= 10) {
            dispatch(anagathicsTerm());
        }
    }

    const handleClick = (event) => {
        event.preventDefault();
        let surviveRoll = (skillCheck(stats[survivalSkill]))
        if (anagathics.using) {
            const tempRoll = skillCheck(stats[survivalSkill])
            if (tempRoll < surviveRoll) {
                surviveRoll = tempRoll;
            }
        }
        const surviveCheck = surviveRoll === 2 ? false : survivalDC <= surviveRoll;
        const mishap = jobDetails.mishapList[roll()]
        const jobEvent = jobObject[career].eventList[roll() + roll() + 2];

        if (surviveCheck) {
            dispatch(survivedTerm({job: career, event: jobEvent, jobDetails: jobDetails}));
            dispatch(saveSurvivedTerm({job: career}))
            dispatch(addEvent(jobEvent))
            navigate(`/term/${career}/survived`)
            setIntro(true);
            return;
        } else {
            dispatch(failedTerm({job: career, event: mishap, jobDetails: jobDetails}));
            navigate(`/term/${career}/failed`);
            dispatch(addEvent(mishap));
            setIntro(true);
            return;
        }
    }
    const cleanup = () => {
        setSkillSelect(false);
        if (!needAgeing && !anagathicCrisis) {
            setIsReady(true);
        }
    }

    return (
        <>
            <h2>Can you handle this career?</h2><br/>
            {intro &&
                <>
                    {trained ?
                        <>
                            <p>Having chosen how to spend this term, now you can select a table to gain a random skill from.</p>
                            <button onClick={handleReady}>Show skill table</button>
                        </> :
                        <>
                            <p>Having chosen a career, now you go through basic training, to prepare for your first term.</p>
                            <button onClick={handleReady}>Move on</button>
                        </>
                    }
                </>
            }
            {skillSelect &&
                <>
                    <h3>Select a skill table:</h3><br/>
                    <JobSkills cleanup={cleanup} />
                </>

            }
            {isReady &&
                <>
                    <p>Having gotten this term's training, it's time to see how well you stand up to the needs and demands of your chosen career.</p>
                    <button onClick={handleClick}>Let's do it!</button>
                </>
            }
            {needAgeing && <AgeUp cleanup={ageingCleanup}/> }

            {anagathicCrisis &&
                <>
                    <h3>Ending Anagathic Treatments...</h3>
                    <p>Ending your use of anagathic treatments delivers a shock to your body, as the years catch up to you all at once.</p>
                    <AgeUp cleanup={anagathicCleanup}/>
                </>
            }

            {!anagathics.using ?
                <>
                    <p>As you get older, the effects of ageing may catch up to you. Would you like to attempt to acquire (highly illegal) anagathic treatments? It can cost anywhere from 200,000 to 1,200,000 credits each term.</p>
                    <button onClick={anagathicCheck}>Acquire Anagathics</button>
                </> :
                <>
                    <p>You are still taking anagathics each term, racking up 200,000 to 1,200,000 credits for each term you continue to take them. Would you like to stop?</p>
                    <button onClick={stopAnagathics}>Stop Taking Anagathics</button>
                </>
            }
        </>
    );
};

export default CareerTerm;
