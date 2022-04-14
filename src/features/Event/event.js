import React from "react";
import { roll } from "../Career/careerHandler";
import { useDispatch } from "react-redux";
import { addContact, addBenefitBonus, addAdvancementBonus } from "../Character/miscBonusSlice";
import { promotion } from "../Career/careerSlice";
import { genericIncrease } from "../Skills/SkillsSlice";
import { increaseStat } from "../Character/StatsSlice";
import { ChoiceCheckEvent } from "./ChoiceCheckEvent";
import { CheckEvent } from "./CheckEvent";
import { Reward } from "./Reward";
import { Choice } from "./Choice";


const checkHandler = (event, stats, skills, helper) => {
    switch (event.checkType) {
        case 'choice':
            return <ChoiceCheckEvent event={event} stats={stats} skills={skills} handler={helper}/>;
        default:
            return <CheckEvent event={event} stats={stats} skills={skills} handler={helper}/>;
    }
}

export const Event = (props) => {
    const {stats, skills, event, career} = props
    const dispatch = useDispatch();

    const rewardHelper = (type, readySetter) => {
        switch (type) {
            case 'benefit':
                dispatch(addBenefitBonus({career: career, value: event.result.value}))
                readySetter(true);
                return;
            case 'skill':
                dispatch(genericIncrease(event.result.skill))
                readySetter(true);
                return;
            case 'stat':
                dispatch(increaseStat(event.result.stat));
                readySetter(true);
                return;
            case 'contacts':
                if (event.result.value === 'roll') {
                    dispatch(addContact({career: career, value: roll(event.result.roll)}))
                } else {
                    dispatch(addContact({career: career, value: event.result.value}))
                }
                readySetter(true);
                return;
            case 'advancement':
                dispatch(addAdvancementBonus({career: career, age:stats.age, duration: 4, value: event.result.value}))
                readySetter(true);
                return;
            case 'choice':
                return (<><h4>Select Reward:</h4><br/>{event.result.choice.map((e, i) => <button key={i} onClick={() => {rewardHelper(event.result.choiceDetail[e].type, readySetter); readySetter(true);}}>{e}</button>)}</>);
            case 'promotion':
                dispatch(promotion());
                readySetter(true);
                return;
            case 'redirect':
                readySetter(true);
                return //need a redirect handler!
            default:
                readySetter(true);
                return;
        }
    }

    const eventRender = (type) => {
        switch (type) {
            case 'check': 
                return checkHandler(event, stats, skills, rewardHelper);
            case 'reward':
                return <Reward event={event} career={career.id} stats={stats} isMishap={props.isMishap} handler={rewardHelper}/>;
            case 'choice':
                return <Choice event={event} handler={rewardHelper}/>
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
