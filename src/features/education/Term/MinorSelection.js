import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { chooseMinor } from "../Utilities/EducationSlice";

function MinorSelection(props) {
    const [selectedMinor, setSelectedMinor] = useState('');

    const {allChoices, cleanup} = props;
    const educationState = useSelector(state => state.education);
    const dispatch = useDispatch();



    const minorChange = (event) => {
        event.preventDefault();
        setSelectedMinor(event.target.value);
        dispatch(chooseMinor({skill: event.target.value}))
        return;
    }

    return ( 
        <div>
            <h5>Minor: --</h5>
            <form onSubmit={cleanup} className="select_minor">
                {allChoices.map((e, i) => {
                    if (e === educationState.major) {
                        return <div key={i}></div>;
                    }
                    return <div key={i}><label key={i}><input key={Math.random()} type="radio" value={e} name={e} checked={selectedMinor === e} onChange={minorChange} />{e}</label></div>;
                })}
                <button type="submit">Confirm Minor.</button>
            </form>
        </div>
    );
}

export default MinorSelection
