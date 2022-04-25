import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { skillCheck } from "../Career/careerHandler";
import { chooseSchool } from "./EducationSlice";
import Popup from "reactjs-popup";

export const UniversityChoice = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [uniPass, setUniPass] = useState(false);
    const [milAcademyLink, setMilAcademyLink] = useState(false);
    const [choiceButtons, setChoiceButtons] = useState(true);
    const [toCareers, setToCareers] = useState(false);
    const [milAcademy, setMilAcademy] = useState({pass: false, branch: ''});

    const stats = useSelector(state => state.stats);
    const jobArray = useSelector(state=> state.careers.jobArray);
    const getCareerModifier = (isMilitary=false) => {
        let mod = 1;
        if (isMilitary) {
            mod = 2;
        }
        if (jobArray.length === 1) {
            return 1 * mod;
        } else if (jobArray.length === 2) {
            return 2 * mod;
        }
        return 0;
    }
    const uniEnroll = () => {
        const result = 8 <= skillCheck(stats.edu) - getCareerModifier();
        if (result) {
            setUniPass(true);
            setChoiceButtons(false);
            dispatch(chooseSchool('University'))
            return;
        }
        setChoiceButtons(false);
        setToCareers(true);
        return;
    }
    const milAcademyEnroll = () => {
        setMilAcademyLink(true);
        setChoiceButtons(false);
        return;
    }

    const armyEnroll = () => {
        const result = 8 <= skillCheck(stats.end) - getCareerModifier(true);
        if (result) {
            setMilAcademy({pass: true, branch: 'army'});
            dispatch(chooseSchool('Army'))
            setMilAcademyLink(false);
            return;
        }
        setToCareers(true);
        return;
    }
    
    const navyEnroll = () => {
        const result = 9 <= skillCheck(stats.int) - getCareerModifier(true);
        if (result) {
            setMilAcademy({pass: true, branch: 'navy'});
            dispatch(chooseSchool('Navy'))
            setMilAcademyLink(false);
            return;
        }
        setToCareers(true);
        return;
    }
    const marinesEnroll = () => {
        const result = 9 <= skillCheck(stats.end) - getCareerModifier(true);
        if (result) {
            setMilAcademy({pass: true, branch: 'marine'});
            dispatch(chooseSchool('Marine'))
            setMilAcademyLink(false);
            return;
        }
        setToCareers(true);
        return;
    }
    return (
        <div className="university_choice">
            <h2>You're officially an adult, with choices laid out in front of you...</h2>
            <p>Now what? You can choose to do pre-career education, either via your planetary university, or through the military academy.</p>
            <p>Alternatively, you can jump straight into pursuing a career of your choice, skipping out on the extra time in school.</p>
            {choiceButtons &&
                <div>
                    <button onClick={uniEnroll}>University</button>
                    <button onClick={milAcademyEnroll}>Military Academy</button>
                    <button onClick={() => {navigate("/choose_career")}}> Straight to Careers</button>
                </div>
            }
            <Popup
                open={uniPass}
                modal
            >
                <h5>You've successfully passed the entrance exams!</h5>
                <Link to="../university_term">Off to school!</Link>
            </Popup>
            <Popup
                open={milAcademyLink}
                modal
            >
                <h5>Which branch's military academy would you like to enroll in?</h5>
                <button onClick={armyEnroll}>Army</button>
                <button onClick={navyEnroll}>Navy</button>
                <button onClick={marinesEnroll}>Marines</button>
            </Popup>
            <Popup
                open={milAcademy.pass}
                modal
            >
                <h5>You've qualified  your planetary {milAcademy.branch}'s military academy!</h5>
                <Link to={`../mil_academy/${milAcademy.branch}`}>Hooah!</Link>
            </Popup>
            {toCareers &&
                <>
                    <h4>Tough luck.</h4>
                    <p>You failed to qualify for your chosen school- but you still qualify to try to enroll for the first three terms of your life.</p>
                    <Link to="/choose_career">Choose a job</Link>
                </>
            }
        </div>
    )
}