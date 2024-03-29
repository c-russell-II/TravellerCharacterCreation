import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../app/store";

export const GraduationDialogue = () => {
    const educationState = useSelector((state: RootState) => state.education);
    const {major, honors} = educationState;
    return (
        <div className="graduation">
            <h5>After four years of your life...</h5>
            <p>You learned far more about {major} than you wanted to{honors ? ', and managed to leave in the top 5% of students in your school, putting you firmly on the honor roll.' : '. You graduate by a somewhat comfortable margin, getting the degree you set out to obtain.'}</p>
            <p>Now, however, is time to turn both eyes to the future. On what awaits you just up the road you've begun to pave.</p>
            <Link to="/choose_career">Time to find out.</Link>
        </div>
    )
}