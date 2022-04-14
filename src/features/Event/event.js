import React from "react";
import { roll } from "../Career/careerHandler";
import { useDispatch, useSelector } from "react-redux";
import { addContact, addBenefitBonus, addAdvancementBonus } from "../Character/miscBonusSlice";
import { promotion } from "../Career/careerSlice";
import { genericIncrease } from "../Skills/SkillsSlice";
import { increaseStat } from "../Character/StatsSlice";
import { ChoiceCheckEvent } from "./ChoiceCheckEvent";
import { CheckEvent } from "./CheckEvent";
import { Reward } from "./Reward";
import { Choice } from "./Choice";
import { useParams } from "react-router-dom";


const checkHandler = (event, helper) => {
    switch (event.checkType) {
        case 'choice':
            return <ChoiceCheckEvent handler={helper}/>;
        default:
            return <CheckEvent handler={helper}/>;
    }
}

export const Event = (props) => {
    const stats = useSelector(state => state.stats);
    const event = useSelector(state => state.term.event);
    const {career} = useParams();

    const dispatch = useDispatch();

    const rewardHelper = (type) => {
        switch (type) {
            case 'benefit':
                dispatch(addBenefitBonus({career: career, value: event.result.value}))
                return;
            case 'setSkill':
                //check if skill is already above set point, if so, return, else dispatch set
                return;
            case 'increaseSkill':
                dispatch(genericIncrease(event.result.skill))
                return;
            case 'stat':
                dispatch(increaseStat(event.result.stat));
                return;
            case 'contacts':
                if (event.result.value === 'roll') {
                    dispatch(addContact({career: career, value: roll(event.result.roll)}))
                } else {
                    dispatch(addContact({career: career, value: event.result.value}))
                }
                return;
            case 'advancement':
                dispatch(addAdvancementBonus({career: career, age:stats.age, duration: 4, value: event.result.value}))
                return;
            case 'choice':
                return (<><h4>Select Reward:</h4><br/>{event.result.choice.map((e, i) => <button key={i} onClick={() => {rewardHelper(event.result.choiceDetail[e].type);}}>{e}</button>)}</>);
            case 'promotion':
                dispatch(promotion());
                return;
            case 'redirect':
                return //need a redirect handler!
            default:
                return;
        }
    }

    const eventRender = (type) => {
        switch (type) {
            case 'check': 
                return checkHandler(rewardHelper);
            case 'reward':
                return <Reward handler={rewardHelper}/>;
            case 'choice':
                return <Choice handler={rewardHelper}/>
            case 'redirect':
                switch (props.event.direction) {
                    case 'injury':
                        return <blah></blah>;
                    case 'life':
                        return <blah></blah>;
                    case 'mishap': 
                        return <blah></blah>;
                    case 'rare': 
                        return <blah></blah>;
                    default: 
                        return;
                }
            default: break;
        }
    }
    return (
        <div className="general_events">
            {eventRender(event.type)}
            <p>Event rendering still missing redirects!</p>
        </div>
    );
}
