import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { roll } from "../../Career/careerHandler";
import { changeByAmount } from "../../Character/StatsSlice";
import { resolveEvent } from "../../Term/Utilities/TermSlice";

const SevereInjury = (props) => {
    const [selection, setSelection] = useState('')
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        const val = roll() + 1;
        dispatch(changeByAmount({stat: selection, value: -1 * val}))
        dispatch(resolveEvent());
        return;
    }

    const handleChange = (event) => {
        event.preventDefault();
        setSelection(event.target.value);
        return;
    }

    return (
        <>
            <p>Though your injuries aren't severe enough to kill you, they certainly aren't far off.</p>
            <h3>Select what skill will be effected by this injury:</h3>
            <form onSubmit={handleSubmit} name="stat">
                <label><input type="radio" name="stat" onChange={handleChange} checked={selection === 'str'} value="str"/>Strength</label>
                <label><input type="radio" name="stat" onChange={handleChange} checked={selection === 'dex'} value="dex"/>Dexterity</label>
                <label><input type="radio" name="stat" onChange={handleChange} checked={selection === 'end'} value="end"/>Endurance</label>
                <input type="submit" value="submit" name="stat"/>
            </form>
        </>
    )
}

export default SevereInjury