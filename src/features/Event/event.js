import React, {useEffect, useState} from "react";
import { roll, skillCheck } from "../Career/careerHandler";
import { useDispatch } from "react-redux";
import {addEvent} from '../Character/charaSlice';
import { addContact, addBenefitBonus, addAdvancementBonus } from "../Character/miscBonusSlice";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { promotion } from "../Career/careerSlice";
import { genericIncrease } from "../Skills/SkillsSlice";
import { increaseStat } from "../Character/StatsSlice";


const Choice = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [choice, setChoice] = useState('');
    const dispatch = useDispatch();
    const {event, helper} = props;
    const list = event.choiceList;

    const handleClick = (choice) => {
        setChoice(choice);
        event.choice = choice;
        dispatch(addEvent(event));
        return (helper(event[choice].type, setIsActive))
    }
    return (
        <Popup
            open={isOpen}
            modal
        >
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...'}</h5>
            <p>{props.event.description}</p>
            {isActive &&
                <div>
                    <p>{props.event[choice].description}</p>
                    <button onClick={() => setIsOpen(false)}>{'Onwards!'}</button>
                </div>
            }
            {!isActive &&
                list.map((e, i) => {
                    return (
                        <button key={i} onClick={() => handleClick(e)}>{props.event[e].button}</button>
                    )
            })}
        </Popup>
    )
}

const CheckEvent = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();

    const {event, stats, skills} = props;
    let mod = 0;
    if (event.checkStat) {
        mod = stats[event.checkStat];
    } else if (event.checkSkill) {
        mod = skills[event.checkSkill]
    }
    const result = event.checkDC <= skillCheck(mod);
    return (
        <Popup
            open={isOpen}
            modal
        >
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...'}</h5>
            <p>{result ? props.event.pass.description : props.event.fail.description}</p>
            <button onClick={() => {setIsOpen(false); dispatch(addEvent(event))}}>{result ? 'Well done.' : 'What a shame...'}</button>
        </Popup>
    )
}

const ChoiceCheckEvent = (props) => {
    const [isActive, setIsActive] = useState(false);
    const [passed, setPassed] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();

    const {event, skills, handler} = props

    const dc = event.checkDC;
    const list = event.choiceList;

    const checkPassed = () => {
        if (passed) {
            return handler(event.pass.result, setIsActive)
        } else {
            return handler(event.fail.result, setIsActive);
        }
    }

    const handleClick = (choice) => {
        const skill = skills[choice];
        const result  = dc <= skillCheck(skill);
        event.passed = result;
        setPassed(result);
        return checkPassed();
    }
    return (
        <Popup
            open={isOpen}
            modal
        >
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...'}</h5>
            <p>{props.event.description}</p>
            {list.map((e, i) => {
                return (
                            <button onClick={() => {handleClick(e)}} key={i}>Use {e}</button>
                )
            })}
            {isActive &&
                <>
                    <p>{passed ? event.pass.description : event.fail.description}</p>
                    {}
                    <button onClick={() => {setIsOpen(false); dispatch(addEvent(event))}}>{passed ? 'Well done!' : 'Too bad...'}</button>
                </>
            }
        </Popup>
    )
}

const Reward = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isReady, setIsReady] = useState(false);
    const dispatch = useDispatch();
    const {event, handler} = props;
    useEffect(() => {setIsOpen(true); setIsReady(false);}, [])
    return (
        <Popup
            open={isOpen}
            modal
        >
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...' }</h5>
            <p>{event.description}</p>
            {isReady ? <button onClick={() => {setIsOpen(false); dispatch(addEvent(event))}}>Great!</button> : handler(event.result.type, setIsReady)}
        </Popup>
    )
}

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
            <p>This needs to be filled out, missing: redirect...</p>
        </div>
    );
}
