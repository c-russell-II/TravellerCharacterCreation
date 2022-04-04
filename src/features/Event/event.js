import React, {useState} from "react";
import { skillCheck } from "../Career/careerHandler";
import { useSelector } from "react-redux";


const choiceHandler = (event) => {
    return (
        <div className="choiceResult">
            <p></p>
        </div>
    )
}

const Choice = (props) => {
    return (
        <div className="choice_event">
            <p>{props.description}</p>
            <ul>
                {props.choiceList.forEach((e, i) =>{
                    return (
                        <div key={i}>
                            <button onClick={() => {choiceHandler(props[e]);}}>{props[e].button}</button>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

const CheckEvent = (props) => {
    const stats = useSelector(state => state.stats);
    const skills = useSelector(state=> state.skills);
    const dc = props.event.checkDC
    let description = props.fail.description;
    const result = dc <= skillCheck(stats[props.checkStat], skills[props.checkSkill]);
    if (result) {
        description = props.pass.description;
    }
    return (
        <div className="skillcheck_event">
            <p>{description}</p>
        </div>
    )
}

const StatCheckEvent = (props) => {
    const stats = useSelector(state => state.stats);
    const result = props.checkDC <= stats[props.checkStat];
    return (
        <div className="stat_check_event">
            <p>{result ? props.fail.description : props.pass.description}</p>
        </div>
    )
}

const ChoiceCheckEvent = (props) => {
    const [isActive, setIsActive] = useState(false);
    const stats = useSelector(state => state.stats);
    const skills = useSelector(state=> state.skills);
    const stat = stats[props.stat];
    const dc = props.checkDC;
    const list = props.choiceList;
    let desc = props.fail.description;
    const handleClick = (choice) => {
        const skill = skills[choice];
        const result = dc <= skillCheck(skill, stat);
        if (result) {
            desc = props.pass.description
        }
        setIsActive(true);
        return;
    }
    return (
        <div className="choice_check_event">
            <p>{props.description}</p>
            {list.forEach((e, i) => {
                return (
                    <div>
                        {!isActive &&
                            <button onClick={() => {handleClick(e)}}>Use {e}</button>
                        }
                    </div>
                )
            })}
            {isActive && 
                <p>{desc}</p>
            }
        </div>
    )
}

const Reward = (props) => {
    return (
        <div className="reward_event">
            <p>{props.description}</p>
        </div>
    )
}

export const Event = (props) => {
    const event = (type) => {
        switch (type) {
            case 'choice': 
                return <Choice event={props.event}/>;
            case 'choiceCheck': 
                return <ChoiceCheckEvent event={props.event}/>
            case 'skillCheck':
                return <CheckEvent event={props.event}/>;
            case 'statCheck': 
                return <StatCheckEvent event={props.event}/>
            case 'reward':
                return <Reward event={props.event}/>;
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
            {event(props.event.type)}
            <p>This needs to be filled out, missing: redirect...</p>
        </div>
    );
}
