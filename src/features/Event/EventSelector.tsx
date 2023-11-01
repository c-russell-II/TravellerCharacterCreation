import { resolveEvent, setMuster, updateEvent } from "../TermSlice/TermSlice";
import { useDispatch } from "react-redux";
import CheckEvent from "./TermEventHandlers/CheckEvent";
import { Choice } from "./TermEventHandlers/Choice";
// import MedicalHandler from "./MedicalHandler";
import RedirectHandler from "./TermEventHandlers/RedirectHandler";
import RewardContainer from "./TermEventHandlers/Rewards/RewardContainer";
import SpecialEventContainer from "./TermEventHandlers/Special/SpecialEventContainer";
// import {skillCheck} from '../Career/careerHandler'
// import { prisoner } from "../Prison/Utilities/Prisoner";
import { AnyEvent } from "../CareerDetails/CareerTypes/CareerEventTypes";

export default function EventSelector(props: { event: AnyEvent }) {
	const event = props.event;
	const dispatch = useDispatch();
	//FIXME: deal with muster/nomuster in event typings...
	// if (event.muster) {
	//     dispatch(setMuster(true))
	// }
	// if (event.noMuster) {
	//     dispatch(setMuster(false));
	// }
	const type = event.type;
	//TODO: Building a system for making a key based on the current term.
	switch (type) {
		case "redirect":
			return <RedirectHandler key={Math.random()} />;
		case "check":
			return <CheckEvent key={Math.random()} event={event} />;
		case "reward":
			return <RewardContainer key={Math.random()} event={event} />;
		case "choice":
			return <Choice event={event} />;
		case "generic":
			return (
				<>
					<p>{event.description}</p>
					<button onClick={() => dispatch(resolveEvent())}>
						Neat!
					</button>
				</>
			);
		// FIXME: Handle Special cases: Medical && Random!
		// case 'medical':
		//     return <MedicalHandler/>;
		case "special":
			return <SpecialEventContainer key={Math.random()} />;
		// case 'random':
		//     if (skillCheck() > 8) {
		//         dispatch(updateEvent(prisoner.eventList[12].pass))
		//     }
		//     dispatch(updateEvent(prisoner.eventList[12].fail));
		//     return;
		default:
			return <></>;
	}
}
