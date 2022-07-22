import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Popup from "reactjs-popup";
import styles from './styles.module.css'
import BranchChoice from "./BranchChoice";
import UniChoices from "./UniChoices";

export const UniversityChoice = (props) => {
    const [uniPass, setUniPass] = useState(false);
    const [milAcademyLink, setMilAcademyLink] = useState(false);
    const [choiceButtons, setChoiceButtons] = useState(true);
    const [toCareers, setToCareers] = useState(false);
    const [milAcademy, setMilAcademy] = useState({pass: false, branch: ''});

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

    return (
        <div>
            <h2 className={styles.choiceHeader}>You're officially an adult, with choices laid out in front of you...</h2>
            <p>Now what? You can choose to do pre-career education, either via your planetary university, or through the military academy.</p>
            <p>Alternatively, you can jump straight into pursuing a career of your choice, skipping out on the extra time in school.</p>
            {choiceButtons &&
                <UniChoices
                    setUniPass={setUniPass}
                    setChoiceButtons={setChoiceButtons}
                    getCareerModifier={getCareerModifier}
                    setToCareers={setToCareers}
                    setMilAcademyLink={setMilAcademyLink}
                />
            }
            <Popup
                open={uniPass}
                modal
            >
                <h5>You've successfully passed the entrance exams!</h5>
                <Link to="../university_term">Off to school!</Link>
            </Popup>
            <BranchChoice
                getCareerModifier={getCareerModifier}
                setMilAcademy={setMilAcademy}
                milAcademyLink={milAcademyLink}
                setMilAcademyLink={setMilAcademyLink}
                setToCareers={setToCareers}
            />
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