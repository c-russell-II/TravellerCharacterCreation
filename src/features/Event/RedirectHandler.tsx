import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import jobObject from "../CareerDetails/CareerDetails";
import { roll, skillCheck } from "../Career/careerHandler";
import genericTables from "./genericTables";
import { addDeferredEvents, updateEvent } from "../TermSlice/TermSlice";
import InjuryEntry from "./Injuries/InjuryEntry";
import { prisoner } from "../Prison/Utilities/Prisoner";
import { RootState } from "../../app/store";
import { AnyEvent } from "../CareerDetails/CareerTyping";

const RedirectHandler = () => {
	const event = useSelector((state: RootState) => state.term.event);
	const job = useSelector((state: RootState) => state.term.job);
	const prevJob = useSelector((state: RootState) => state.careers.previousJob);
	const dispatch = useDispatch();
	const [body, setBody] = useState(<></>);
	let { career } = useParams();
	career = checkCareer(career, prevJob);
	const mishapTable = jobObject[career].mishapList;
	const lifeTable = genericTables.life;
	const unusualTable = genericTables.unusual;
	const prisonEvents = genericTables.prisonEvent;

	const lifeRedirect = useCallback(
		() => dispatch(updateEvent(lifeTable[skillCheck()])),
		[dispatch, lifeTable]
	);
	const mishapRedirect = useCallback(() => {
		dispatch(updateEvent(mishapTable[roll()]));
	}, [dispatch, mishapTable]);
	const unusualRedirect = useCallback(
		() => dispatch(updateEvent(unusualTable[roll()])),
		[dispatch, unusualTable]
	);
	const prisonRedirect = useCallback(
		() => dispatch(updateEvent(prisonEvents[roll()])),
		[dispatch, prisonEvents]
	);
	useEffect(() => {
		handleRedirect();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const handleRedirect = () => {
		//TODO: better event handling for incorrect event types
		if (!event) {
			console.warn("Error in event handling, redirect handler received null for event from career term!")
			return;
		}
		if (event.type !== "redirect") {
			console.warn("Error in event handling, redirect handler received non-redirect event!")
			return;
		}
		switch (event.destination) {
			case "injury":
				setBody(<InjuryEntry />);
				if (!prisoner.specialtiesList.includes(job)) {
					dispatch(addDeferredEvents([{ type: "medical" }]));
				}
				return;
			case "prisonRedirect":
				prisonRedirect();
				return;
			case "life":
				lifeRedirect();
				return;
			case "mishap":
				mishapRedirect();
				return;
			case "unusual":
				unusualRedirect();
				return;
			default:
				return;
		}
	}
	return (
		<>
			{isDescribedEvent(event as AnyEvent) && <p>{isDescribedEvent(event as AnyEvent)}</p>}
			{body}
		</>
	);
};

//Checks the event to see if it has a description. If it does, returns the description, else returns false
const isDescribedEvent = (event: AnyEvent) => {
	if (event.type === "special") {
		return false;
	} else {
		return event.description;
	}
}
const checkCareer = (
	currCareer: string | undefined,
	prevCareer: string | null
): string => {
	if (typeof currCareer !== "string" && typeof prevCareer !== "string") {
		console.warn("Error in redirect event handler - no valid career saved. Using 'Drifter'")
		return "drifter";
	}
	if (typeof currCareer !== "string") {
		console.warn("Error in redirect event handler - No current career found. Using previous career.")
		return prevCareer as string;
	}
	return currCareer;
};

export default RedirectHandler;
