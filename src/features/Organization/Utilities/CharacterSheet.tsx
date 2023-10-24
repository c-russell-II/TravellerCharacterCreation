import React from "react";
import { useSelector } from "react-redux";
import SpecialtySkillDisplay from "../../CharacterSidebar/SpecialtySkillDisplay";
import { RootState } from "../../../app/store";
import { AllSkills, skillState } from "../../Skills/SkillsSlice";

const CharacterSheet = React.forwardRef((props, ref) => {
    const chara = useSelector((state: RootState) => state.chara);
    const stats = useSelector((state: RootState) => state.stats);
    const skills = useSelector((state: RootState) => state.skills);
    const statList = Object.keys(stats).slice(0, -2);
    
    
    // ref={ref} TODO: Figure out what this ref was doing... it was on the div?
    return (
        <div  >
            <h3>{chara.charaName}</h3>
            {statList.map((e, i) => <p key={i}>{e}:{stats.displayValues[e as keyof StatDisplayHolder]}</p>)};
            <SheetSkillRender currSkills={skills.trainedSkills} skills={skills}/>
        </div>
    )
})

function SheetSkillRender (props: {currSkills: string[], skills: skillState}) {
    return (
        <>
            {props.currSkills.map((e: string) => {
                const activeSkill = props.skills[e as keyof AllSkills]
                if (activeSkill.specialties) {
                    return <SpecialtySkillDisplay key={`charsheet skill render ${e}`} skill={e} skillObj={activeSkill}/>
                } else {
                    return <p key={`charsheet skill render ${e}`}> {e}: {activeSkill.value} </p>
                }
            })}
        </>
    )
}

export default CharacterSheet;
