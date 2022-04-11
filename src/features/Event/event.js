import React, {useEffect, useState} from "react";
import { roll, skillCheck } from "../Career/careerHandler";
import { useSelector, useDispatch } from "react-redux";
import {addEvent} from '../Character/charaSlice';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { addBenefitBonus } from "../Character/miscBonusSlice";
import {genericIncrease} from '../Skills/SkillsSlice'



const Choice = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [isActive, setIsActive] = useState(false);
    const [choice, setChoice] = useState('');
    const dispatch = useDispatch();
    const event = props.event;
    const list = props.choiceList;
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
                list.forEach((e, i) => {
                    return (
                        <button onClick={() => {setIsActive(true); setChoice(e); event.choice = e; dispatch(addEvent(props.event))}}>{props.event[e].button}</button>
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
    event.passed = result;
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

    const {event, skills} = props

    const dc = event.checkDC;
    const list = event.choiceList;

    const handleClick = (choice) => {
        const skill = skills[choice];
        const result  = dc <= skillCheck(skill);
        event.passed = result;
        setPassed(result);
        setIsActive(true);
        return;
    }
    return (
        <Popup
            open={isOpen}
            modal
        >
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...'}</h5>
            <p>{props.event.description}</p>
            {list.forEach((e, i) => {
                return (
                            <button onClick={() => {handleClick(e)}} key={i}>Use {e}</button>
                )
            })}
            {isActive &&
                <>
                    <p>{passed ? event.pass.description : event.fail.description}</p>
                    <button onClick={() => {setIsOpen(false); dispatch(addEvent(event))}}>{passed ? 'Well done!' : 'Too bad...'}</button>
                </>
            }
        </Popup>
    )
}

const Reward = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();
    const {event, career} = props;

    return (
        <Popup
            open={isOpen}
            modal
        >
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...' }</h5>
            <p>{event.description}</p>
            <button onClick={() => {setIsOpen(false); dispatch(addEvent(event))}}>Great!</button>
        </Popup>
    )
}

const checkHandler = (event, stats, skills) => {
    switch (event.checkType) {
        case 'choice':
            return <ChoiceCheckEvent event={event} stats={stats} skills={skills}/>;
        default:
            return <CheckEvent event={event} stats={stats} skills={skills}/>;
    }
}

export const Event = (props) => {
    const {stats, skills, event, career} = props
    const eventRender = (type) => {
        switch (type) {
            case 'check': 
                return checkHandler(event, stats, skills);
            case 'reward':
                return <Reward event={event} career={career.id} isMishap={props.isMishap}/>;
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
