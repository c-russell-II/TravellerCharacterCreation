import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import EventSelector from "./EventSelector";

const EventContainer = () => {
	const event = useSelector((state: RootState) => state.term.event);
	const survived = useSelector((state: RootState) => state.term.survived);

	return (
		<div>
			{survived ? (
				<h3>A Remarkable Event...</h3>
			) : (
				<h3>A worrying development...</h3>
			)}
			{event && !event.resolved && <EventSelector event={event}/>}
		</div>
	);
};



export default EventContainer;
