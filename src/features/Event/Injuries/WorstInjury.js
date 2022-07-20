import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { roll } from "../../Career/careerHandler";
import { changeByAmount } from "../../Character/StatsSlice";
import { resolveEvent } from "../../Term/Utilities/TermSlice";
const WorstInjury = (props) => {
    const dispatch = useDispatch();
    const [selection, setSelection] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        const val = roll() + 1;
        const array = ['str', 'dex', 'end']
        const final = array.filter(e => e !== selection);
        dispatch(changeByAmount({stat: selection, value: -val}))
        final.forEach(e => dispatch(changeByAmount({stat: e, value: -2})))
        dispatch(resolveEvent());
    }

    const handleChange = (event) => {
        event.preventDefault();
        setSelection(event.target.value)
    }
    return(
        <>
        <p>The injuries you sustain are nearly enough to kill you, and though they don't, your body has the scars to show it.</p>
        <form name="stat" onSubmit={handleSubmit}>
            <h4>Select which of your physical stats will be most harmed by this:</h4>
            <label><input name="stat" type="radio" value="str" checked={selection === 'str'} onChange={handleChange}/>Strength</label>
            <label><input name="stat" type="radio" value="dex" checked={selection === 'dex'} onChange={handleChange}/>Dexterity</label>
            <label><input name="stat" type="radio" value="end" checked={selection === 'end'} onChange={handleChange}/>Endurance</label>
            <input type="submit" value="submit" name="stat"/>
        </form>
        </>
    )
}

export default WorstInjury