import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import jobObject, { parentJobs } from "../../Career/CareerDetails";
import { skillCheck } from "../../Career/careerHandler";
import { selectJob, setCommissioned } from "../../Career/careerSlice";
import { setTrained } from "../../Character/charaSlice";
import { increaseStat } from "../../Character/StatsSlice";
import { genericIncrease } from "../../Skills/SkillsSlice";

const MilitaryAcademyGraduation = (props) => {
    const {branch} = useParams();
    const currentJob = useSelector(state => state.careers.currentJob)
    const honors = useSelector(state => state.education.honors)
    const soc = useSelector(state => state.stats.soc);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [next, setNext] = useState(false)
    const [pickSpec, setPickSpec] = useState(false);
    const [intro, setIntro] = useState(true);
    const [needSkills, setNeedSkills] = useState(false);
    const [skillArray, setSkillArray] = useState([])
    const [commission, setCommission] = useState(false);
    const [triedCommission, setTriedCommission] = useState(false);

    const handleChange = (event) => {
        event.preventDefault();
        if (skillArray.includes(event.target.value)) {
            setSkillArray(prev => prev.filter(e => e !== event.target.value));
            return;
        }
        if (skillArray.length >= 3) {
            alert("You can't select any more skills! If you wish to change your selection, de-select a skill first.")
            return;
        }
        setSkillArray(prev => prev.push(event.target.value));
    }

    const handleMilitary = (event) => {
        event.preventDefault();
        dispatch(setTrained());
        setNext(false);
        setPickSpec(true);
        return;
    }

    const handleSpecialty = (spec) => {
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
    const handleSubmit = (event) => {
        event.preventDefault();
        skillArray.forEach((e) => dispatch(genericIncrease({skill: e})));
        if (commission) {
            dispatch(setCommissioned(currentJob));
        }
        setNeedSkills(false);
        navigate(`/term/${currentJob}/start`)
    }
    const handleCareer = (event) => {
        event.preventDefault();
        navigate('/choose_career')
        return;
    }

    const handleContinue = (event) => {
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
                {parentJobs[branch].specialtiesList.map((e, i) => <button key={i} onClick={handleSpecialty(e)}>{jobObject[e].title}</button>)}
                {!triedCommission &&
                <><p>Also, if you desire, you can enter as a commissioned officer. This offers you unique training opportunities, in addition to the obvious differences in rank.</p>
                <button onClick={handleCommission}>Commission!</button></>
                }
            </>
        }
        {needSkills &&
            <>
                <p>In place of standard basic training for {jobObject[currentJob].title}, you are getting advanced training- your studies covered much of what basic training would have, and much it did not.</p>
                <form name="skills" onSubmit={handleSubmit}>
                    {parentJobs[branch].skills.service.map((e, i) => {
                        if (e.type !== 'skill') {
                            return e.list.map((f, n) => <input key={n + 6} type="checkbox" name="skills" value={f} onChange={handleChange} checked={skillArray.includes(f)}>{f}</input>)
                        }
                        return <input key={i} type="checkbox" name="skills" value={e} onChange={handleChange} checked={skillArray.includes(e)}>{e}</input>
                    })}
                </form>
            </>
        }
        </>
    )
}

export default MilitaryAcademyGraduation;