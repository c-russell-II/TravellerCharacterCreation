import React, { useState } from "react";

const SkillChoiceRender = (props) => {
    const {skills, cleanup} = props;
    const [isChecked, setIsChecked] = useState({});

    const handleChange = (event) => {
        event.preventDefault()
        const thing = event.target.value;
        setIsChecked({[thing]: true, skill: thing});
        return;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        cleanup(isChecked.skill);
    }

    const iterator = (e, i) => {
        return (
            <div key={i}>
                <label>
                <input checked={isChecked[e]} value={e} name={e} type="radio" onChange={handleChange}/> {e}
                </label>
            </div>
        )
    }

    return (
        <>
            <p>Select a skill:</p>
            <form onSubmit={handleSubmit}>
                {skills.map((e, i) => {return iterator(e, i)})}
                <button type="submit">Confirm selection</button>
            </form>
        </>
    )
}

export default SkillChoiceRender;