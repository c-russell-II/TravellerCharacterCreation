import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changeByAmount } from "../../Character/StatsSlice";
import { resolveEvent } from "../../Term/TermSlice";

const MediumInjury = (props) => {
    const [selected, setSelected] = useState('')
    const dispatch = useDispatch();

    const handleChange = (event) => {
        event.preventDefault();
        setSelected(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(changeByAmount({stat: selected, value: -2}));
        dispatch(resolveEvent());
    }
    return (
        <>
            <p>Your injuries aren't severe enough to be life threatening, but they are severe- major trauma to a limb, or trauma to internal organs.</p>
            <form name="stat" onSubmit={handleSubmit}>
                <label><input name="stat" type="radio" onChange={handleChange} checked={selected === 'str'} value="str"/>Strnegth</label>
                <label><input name="stat" type="radio" onChange={handleChange} checked={selected === 'dex'} value="dex"/>Dexterity</label>
                <label><input name="stat" type="radio" onChange={handleChange} checked={selected === 'end'}  value="end"/>Endurance</label>
                <input name="stat" type="submit" value="submit"/>
            </form>
        </>
    )
}

export default MediumInjury;