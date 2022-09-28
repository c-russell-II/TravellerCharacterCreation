import React from "react";
import { useSelector } from "react-redux";
import SpecialtySkillDisplay from "../../CharacterSidebar/SpecialtySkillDisplay";

const CharacterSheet = React.forwardRef((props, ref) => {
    const chara = useSelector(state => state.chara);
    const stats = useSelector(state => state.stats);
    const skills = useSelector(state => state.skills);
    const statList = Object.keys(stats).slice(0, -2);
    return (
        <div ref={ref} >
            <h3>{chara.name}</h3>
            {statList.map((e, i) => <p key={i}>{e}:{stats.displayValues[e]}</p>)};
            {skills.trainedSkills.map(e => {
                if (skills.specialtySkills.includes(e)) {
                    return <SpecialtySkillDisplay key={`Skills - ${e}`} skill={e} skillObj={skills[e]}/>
                } else if (!skills.specialtySkills.includes(e)) {
                    return <p key={`Skills - ${e}`}>{e}: {skills[e].value}</p>
                } else {
                    return <p>If you're seeing this, something broke!</p>
                }
            })};
        </div>
    )
})

export default CharacterSheet;
