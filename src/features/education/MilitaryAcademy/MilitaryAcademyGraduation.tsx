import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import jobObject from "../../CareerDetails/CareerDetails";
import { getParentCareer, skillCheck } from "../../Career/careerHandler";
import { selectJob, setCommissioned } from "../../Career/careerSlice";
import { setTrained } from "../../Character/charaSlice";
import { increaseStat } from "../../Character/StatsSlice";
import { genericIncrease } from "../../Skills/SkillsSlice";
import { RootState } from "../../../app/store";
import { AnyTermReward } from "../../CareerDetails/CareerTyping";

const MilitaryAcademyGraduation = () => {
    const {branch} = useParams();
    const currentJob = useSelector((state: RootState) => state.careers.currentJob)
    const honors = useSelector((state: RootState) => state.education.honors)
    const soc = useSelector((state: RootState) => state.stats.soc);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [next, setNext] = useState(false)
    const [pickSpec, setPickSpec] = useState(false);
    const [intro, setIntro] = useState(true);
    const [needSkills, setNeedSkills] = useState(false);
    const [skillArray, setSkillArray] = useState<any[]>([])
    const [commission, setCommission] = useState(false);
    const [triedCommission, setTriedCommission] = useState(false);

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (skillArray.includes(event.currentTarget.value)) {
            setSkillArray(prev => prev.filter(e => e !== event.currentTarget.value));
            return;
        }
        if (skillArray.length >= 3) {
            alert("You can't select any more skills! If you wish to change your selection, de-select a skill first.")
            return;
        }
        setSkillArray(prev => [...prev, event.currentTarget.value]);
    }

    const handleMilitary = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(setTrained());
        setNext(false);
        setPickSpec(true);
        return;
    }

    const handleSpecialty = (spec: string) => {
        setPickSpec(false);
        dispatch(selectJob({job: spec, details: jobObject[spec]}));
        setNeedSkills(true);
    }

    const handleCommission = () => {
        setTriedCommission(true);
        if (honors) {
            setCommission(true);
        }
        let rollVal = skillCheck(soc) + 2;
        if (rollVal >= 8) {
            setCommission(true);
        }
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        skillArray.forEach((e) => dispatch(genericIncrease({skill: e})));
        if (commission) {
            dispatch(setCommissioned(currentJob as string));
        }
        setNeedSkills(false);
        navigate(`/term/${currentJob}/start`)
    }
    const handleCareer = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate('/choose_career')
        return;
    }

    const handleContinue = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();

        dispatch(increaseStat('edu'))
        if (honors) {
            dispatch(increaseStat('soc'))
        }
        setNext(true);
        setIntro(false);
    }
    return (
        <>
        {honors ? <h3>You've graduated, with honors!</h3> : <h3>You've graduated!</h3>}
        {next &&
            <>
                <p>Now, to determine where to go next- enroll in your chosen branch of the military, or seek out a different career?</p>
                <button onClick={handleMilitary}>Join the military</button><button onClick={handleCareer}>Choose Another Career</button>
            </>
        }
        {intro &&
            <>
                <p>Due to some combination of social graces - or just your position in society - physical fitness, and raw intellect, you manage to graduate from {branch} academy.</p>
                <button onClick={handleContinue}>Hoorah!</button>
            </>
        }
        {pickSpec &&
            <>
                <p>Having decided to enlist, now you need to select your specialty- the specific rating, or set of jobs, you'll be working in.</p>
                {getParentCareer(branch as string).specialtiesList.map((e, i) => <button key={i} onClick={(ev) => handleSpecialty(e)}>{jobObject[e].title}</button>)}
                {!triedCommission &&
                <><p>Also, if you desire, you can enter as a commissioned officer. This offers you unique training opportunities, in addition to the obvious differences in rank.</p>
                <button onClick={handleCommission}>Commission!</button></>
                }
            </>
        }
        {needSkills &&
            <>
                <p>In place of standard basic training for {jobObject[currentJob as string].title}, you are getting advanced training- your studies covered much of what basic training would have, and much it did not.</p>
                <form name="skills" onSubmit={handleSubmit}>
                    {<CareerSkillMap choices={getParentCareer(branch as string).skills.service} handler={handleChange}/> }
                </form>
            </>
        }
        </>
    )
}

function CareerSkillMap (props: {choices: AnyTermReward[], handler: (e: any) => void}) {
    const {choices, handler} = props;
    return (
        <>
            {choices.map((e: AnyTermReward) => {
                if (e.type === 'skill') {
                    //TODO: handle specialty skills in Mil Academy Graduation!
                    return (
                        <div key={`checkbox div for ${e.skill}`}>
                            <label htmlFor={e.skill}>{e.skill}</label>
                            <input type="checkbox" name="skills" value={e.skill} id={e.skill} onChange={handler}/>
                        </div>
                    )
                }
                if (e.type === 'stat') {
                    return (
                        <div key={`checkbox div for ${e.stat}`}>
                            <label htmlFor={e.stat}>{e.stat}</label>
                            <input type="checkbox" name="skills" value={e.stat} id={e.stat} onChange={handler}/>
                        </div>
                    )
                }
                //TODO: Handle choice term rewards in Mil Academy Graduation!
                if (e.type === 'choice') {
                    return (<></>)
                }
                return (<></>)
            })}
        </>
    )
}

export default MilitaryAcademyGraduation;