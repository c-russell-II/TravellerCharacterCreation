import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import jobObject from "../Career/CareerDetails";
import { roll, skillCheck } from "../Career/careerHandler";
import genericTables from "./genericTables";
import { addDeferredEvents, resolveEvent, updateEvent } from "../Term/TermSlice";
import InjuryEntry from "./Injuries/InjuryEntry";

const RedirectHandler = (props) => {
    const event = useSelector(state=> state.term.event);
    const { career } = useParams();
    const mishapTable = jobObject[career].mishapList;
    const dispatch = useDispatch();
    const [body, setBody] = useState();
    const lifeTable = genericTables.life;
    const unusualTable = genericTables.unusual;

    const lifeRedirect = useCallback(() => dispatch(updateEvent(lifeTable[skillCheck()])), [dispatch, lifeTable]);
    const mishapRedirect = useCallback(() => {
        dispatch(updateEvent(mishapTable[roll()]))
    }, [dispatch, mishapTable]);
    const unusualRedirect = useCallback(() => dispatch(updateEvent(unusualTable[skillCheck()])), [dispatch, unusualTable])

    useEffect(() => {
        switch(event.destination) {
            case 'injury':
                setBody(<InjuryEntry/>);
                dispatch(addDeferredEvents([{type:'medical'}]))
                return;
            case 'life':
                lifeRedirect();
                return;
            case 'mishap':
                mishapRedirect();
                return;
            case 'unusual':
                unusualRedirect();
                return;
            default:
                alert("Unhandled Redirect Event! " + event.destination)
                dispatch(resolveEvent())
                return;
        }
    }, [dispatch, event, lifeRedirect, mishapRedirect, unusualRedirect])
    return (
        <>
            {event?.description && <p>{event.description}</p>}
            {body}
        </>
    )
}

export default RedirectHandler