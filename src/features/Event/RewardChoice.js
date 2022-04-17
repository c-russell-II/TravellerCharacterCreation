import React, { useState } from "react";
import { useSelector } from "react-redux";
import IncreaseSkillChoice from "../Skills/IncreaseSkillChoice";
import SetSkillChoice from "../Skills/SetSkillChoice";

const RewardChoice = (props) => {
    const skills = useSelector(state => state.skills);
    const event = useSelector(state => state.term.event);
    const [open, setOpen] = useState(false);

    const {cleanup} = props;

    const choiceTypeChecker = (type) => {
        switch (type) {
            case 'setSkill':
                setOpen(true);
                return <>{open && <SetSkillChoice skillList={event.choices} specialtyList={event.specialtyList} value={event.value} cleanup={cleanup}/>}</>
            case 'increaseSkill':
                setOpen(true);
                return <>{open && <IncreaseSkillChoice skillList={event.choices} specialtyList={event.specialtyList} cleanup={cleanup}/>}</>
            case 'anySkill':
                const skillList = [];
                const specialtyList = {};
                skills.trainedSkills.forEach((e) => {skillList.push(e); specialtyList[e] = skills[e].specialtiesList;})
                setOpen(true);
                return <>{open && <IncreaseSkillChoice skillList={skillList} specialtyList={specialtyList} cleanup={cleanup}/>}</>
            default: 
                return;
        }
    }

    return (
        <>
            <h4>Select Reward:</h4><br/>
            {/* {event.result.choice.map((e, i) => <button key={i} onClick={() => {rewardHelper(event.result.choiceDetail[e]);}}>{e}</button>)} */}
            {choiceTypeChecker(event.result.choiceType)}
        </>
        )
};

export default RewardChoice;