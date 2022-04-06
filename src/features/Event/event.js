import React, {useEffect, useState} from "react";
import { skillCheck } from "../Career/careerHandler";
import { useSelector, useDispatch } from "react-redux";
import {addEvent} from '../Character/charaSlice';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';



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
            {list.forEach((e, i) => {
                return (
                            <button onClick={() => {setIsActive(true); setChoice(e); event.choice = choice; dispatch(addEvent(choice))}}>{props.event[e].button}</button>
                )
            })}
        </Popup>
    )
}

const CheckEvent = (props) => {
    const stats = useSelector(state => state.stats);
    const skills = useSelector(state=> state.skills);
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();
    const event = props.event;
    const dc = props.event.checkDC
    const result = dc <= skillCheck(stats[props.checkStat], skills[props.checkSkill]);
    result ? delete event.fail : delete event.pass;
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

const StatCheckEvent = (props) => {
    const stats = useSelector(state => state.stats);
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();
    const event = props.event
    const result = props.event.checkDC <= stats[props.event.checkStat];
    result ? delete event.fail : delete event.pass;
    return (
        <Popup
            open={isOpen}
            modal
        >
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...'}</h5>
            <p>{result ? props.event.pass.description : props.event.fail.description}</p>
            <button onClick={() =>  {setIsOpen(false); dispatch(addEvent(event))}}>{result ? 'Well done.' : 'What a shame...'}</button>
        </Popup>
    )
}

const ChoiceCheckEvent = (props) => {
    const [isActive, setIsActive] = useState(false);
    const [passed, setPassed] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();
    const event = props.event;
    const stats = useSelector(state => state.stats);
    const skills = useSelector(state=> state.skills);
    const stat = stats[props.event.stat];
    const dc = props.event.checkDC;
    const list = props.event.skillList;
    const handleClick = (choice) => {
        const skill = skills[choice];
        const result = dc <= skillCheck(skill, stat);
        if (result) {
            delete event.fail;
            setPassed(true);
        } else {
            delete event.pass;
            setPassed(false);
        }
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
                            <button onClick={() => {handleClick(e)}}>Use {e}</button>
                )
            })}
            {isActive &&
                <div> 
                    <p>{passed ? props.event.pass.description : props.event.fail.description}</p>
                    <button onClick={() => {setIsOpen(false); dispatch(addEvent(event))}}>{passed ? 'Well done!' : 'Too bad...'}</button>
                </div>
            }
        </Popup>
    )
}

const Reward = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useDispatch();
    return (
        <Popup
            open={isOpen}
            modal
        >
            <h5>{props.isMishap ? "This year's disaster..." : 'This year in your life...' }</h5>
            <p>{props.event.description}</p>
            <button onClick={() => {setIsOpen(false); dispatch(addEvent(props.event))}}>Great!</button>
        </Popup>
    )
}

export const Event = (props) => {
    const event = (type) => {
        switch (type) {
            case 'choice': 
                return <Choice event={props.event} isMishap={props.isMishap}/>;
            case 'choiceCheck': 
                return <ChoiceCheckEvent event={props.event} isMishap={props.isMishap}/>
            case 'skillCheck':
                return <CheckEvent event={props.event} isMishap={props.isMishap}/>;
            case 'statCheck': 
                return <StatCheckEvent event={props.event} isMishap={props.isMishap}/>
            case 'reward':
                return <Reward event={props.event} isMishap={props.isMishap}/>;
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
