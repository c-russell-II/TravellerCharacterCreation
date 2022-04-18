import React, { useState } from "react";

export const SelectSpecialty = (props) => {
    const {skill, list, passSpecialty} = props;
    const [isChecked, setIsChecked] = useState({});

    const handleChange = (event) => {
        event.preventDefault()
        const thing = event.target.value;
        setIsChecked({[thing]: true, spec: thing});
        return;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        passSpecialty(isChecked.spec);
    }

    const iterator = (e, i) => {
        return (
            <div key={i}>
                <label>
                <input key={Math.random()} checked={isChecked[e]} value={e} name={e} type="radio" onChange={handleChange}/> {e}
                </label>
            </div>
        )
    }

    return(
        <>
            <p>Select a particular specialty for your {skill} skill.</p>
            <form onSubmit={handleSubmit}>
                {list.map((e, i) => {return iterator(e, i)})}
                <button type="submit">Confirm selection</button>
            </form>
        </>
    )
}