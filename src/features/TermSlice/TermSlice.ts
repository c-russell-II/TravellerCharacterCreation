import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyEvent, CareerSpecialty } from "../CareerDetails/CareerTyping";

export interface TermState {
	job: string;
	survived: boolean;
	event: AnyEvent & {resolved: boolean} | null;
	isEventResolved: boolean;
	deferredEvents: AnyEvent[];
	jobDetails: CareerSpecialty | null;
	advancementBonus: number;
	muster: boolean;
}

const initialState: TermState = {
	job: "",
	survived: false,
	event: null,
	isEventResolved: false,
	deferredEvents: [],
	jobDetails: null,
	advancementBonus: 0,
	muster: false,
};
type termPayload = {
	job: string;
	event: AnyEvent & { resolved?: boolean };
	jobDetails: CareerSpecialty;
};
//TODO: this needs to be cut down *heavily,* very little of it is directly useful in a way the other slices aren't already doing
//TODO: middleware must track: resolveEvent
const options = {
	name: "term",
	initialState: initialState,
	reducers: {
		survivedTerm: (
			state: TermState,
			action: PayloadAction<termPayload>
		) => {
			const { job, event, jobDetails } = action.payload;
			state.job = job;
			state.survived = true;
			state.event = { ...event, resolved: false };
			state.jobDetails = jobDetails;
			return state;
		},
		failedTerm: (state: TermState, action: PayloadAction<termPayload>) => {
			const { job, event, jobDetails } = action.payload;
			state.job = job;
			state.survived = false;
			state.event = { ...event, resolved: false };
			state.jobDetails = jobDetails;
			return state;
		},
		advancementBonus: (
			state: TermState,
			action: PayloadAction<number>
		) => {
			state.advancementBonus = action.payload;
			return state;
		},
		updateEvent: (state: TermState, action: PayloadAction<AnyEvent>) => {
			state.event = { ...action.payload, resolved: false };
			return state;
		},
		resolveEvent: (state: TermState) => {
			const newEvent = state.deferredEvents.shift();
			if (newEvent) {
				state.event = {...newEvent, resolved: false};
				return state;
			}
			state.event = null;
			return state;
		},
		addDeferredEvents: (state: TermState, action: PayloadAction<AnyEvent[]>) => {
			state.deferredEvents = state.deferredEvents.concat(action.payload);
			return state;
		},
		resolveTerm: (state: TermState) => {
			state = initialState;
			return state;
		},
		setMuster: (state: TermState, action: PayloadAction<boolean>) => {
			state.muster = action.payload;
			return state;
		},
	},
};

const termSlice = createSlice(options);



export const {
	survivedTerm,
	failedTerm,
	advancementBonus,
	updateEvent,
	resolveEvent,
	addDeferredEvents,
	resolveTerm,
	setMuster,
} = termSlice.actions;
export default termSlice.reducer;
