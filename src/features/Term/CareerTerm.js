import React, { useState } from "react";
import jobObject from "../Career/CareerDetails";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { roll, skillCheck } from "../Career/careerHandler";
import { failedTerm, survivedTerm } from "./TermSlice";
import { JobSkills } from "../Skills/JobSkills";
import { basicTraining, increaseToZero } from "../Skills/SkillsSlice";
import { setTrained } from "../Character/charaSlice";
import { saveSurvivedTerm } from "../Career/careerSlice";

const CareerTerm = (props) => {
    const {career} = useParams();
    const stats = useSelector(state => state.stats);
    const trained = useSelector(state=> state.skills.isTrained);
    const [skillSelect, setSkillSelect] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [intro, setIntro] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const jobDetails = jobObject[career]
    const {survivalSkill, survivalDC} = jobDetails;

    const handleReady = (event) => {
        event.preventDefault();
        setIntro(false);
        if (!trained) {
            const basicTrainingArray = jobDetails.skills.service.map(e => e.skill);
            dispatch(basicTraining(basicTrainingArray))
            dispatch(setTrained());
            setIsReady(true);
            return;
        }
        setSkillSelect(true);
    }

    const handleClick = (event) => {
        event.preventDefault();
        const surviveCheck = survivalDC <= skillCheck(stats[survivalSkill]);
        const mishap = jobDetails.mishapList[roll()]
        const jobEvent = jobObject[career].eventList[roll() + roll() + 2];

        setIntro(true);
        if (surviveCheck) {
            dispatch(survivedTerm({job: career, event: jobEvent, jobDetails: jobDetails}));
            dispatch(saveSurvivedTerm({job: career}))
            navigate(`/term/${career}/survived`)
            return;
        } else {
            dispatch(failedTerm({job: career, event: mishap, jobDetails: jobDetails}));
            navigate(`/term/${career}/failed`);
            return;
        }
    }
    const cleanup = () => {setSkillSelect(false); setIsReady(true);}

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
        </>
    );
};

export default CareerTerm;
