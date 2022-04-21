import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import jobObject from "../../Career/CareerDetails";
import { skillCheck } from "../../Career/careerHandler";
import { selectJob } from "../../Career/careerSlice";

const EntertainerQual = (props) => {
    const [selection, setSelection] = useState('');
    const stats = useSelector(state => state.stats);
    const previousCareers = useSelector(state => state.careers.careerCount);
    const allBonuses = useSelector(state => state.misc.qualification);
    const currentDC = 5 + previousCareers;
    const dispatch = useDispatch();
    const {career} = useParams();
    const specialty = jobObject[career];
    const navigate = useNavigate();
    const qualBonus = career in allBonuses ? allBonuses[career].value : 0;

    const handleChange = (event) => {
        event.preventDefault();
        setSelection(event.target.value);
        return;
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const val = skillCheck(stats[selection]) + qualBonus;
        if (val >= currentDC) {
            dispatch(selectJob({job: career, details: specialty}))
            navigate(`/term/${career}/start`)
        }
        navigate(`../qualification/${career}/failed`)
    }

    return (
        <>
            <h2>Entertainer Qualification:</h2>
            <p>As an entertainer, you can get by on your physical ability- your skill in your chosen craft- or by working smart.</p>
            <form name="qual_choice" onSubmit={handleSubmit}>
                <label><input name="qual_choice" value="dex" type="radio" onChange={handleChange} checked={selection==='dex'}/>Use Dexterity</label>
                <label><input name="qual_choice" value="int" type="radio" onChange={handleChange} checked={selection==='int'}/>Use Intelligence</label>
                <input type='submit' value='submit' name='qual_choice'/>
            </form>
        </>
    )
}

export default EntertainerQual;