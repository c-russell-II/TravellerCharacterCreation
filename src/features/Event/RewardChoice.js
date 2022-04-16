import React, { useState } from "react";
import { useSelector } from "react-redux";
import SetSkillChoice from "../Skills/SetSkillChoice";

const RewardChoice = (props) => {
    const event = useSelector(state => state.term.event);

    const cleanup = () => {}

    const choiceTypeChecker = (type) => {
        switch (type) {
            case 'setSkill':
                return  <SetSkillChoice skillList={event.choices} specialtyList={event.specialtyList} value={event.value} cleanup={cleanup}/>
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