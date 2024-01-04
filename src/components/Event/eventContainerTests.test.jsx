import { Provider } from "react-redux";
import TermSlice, { TermState } from "../TermSlice/TermSlice";
import EventContainer from './EventContainer'
import { configureStore } from "@reduxjs/toolkit";

export function renderWithTermStore(
	ui,
	{
		preloadedState={},
		store= configureStore({reducer:{ term: TermSlice }, preloadedState}),
		...renderOptions
	} = {}
) {
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>
	}
	return { store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}

describe("Event Container", () => {
    const testTerm = {
		job: "test",
		survived: false,
		advanced: false,
		event: null,
		deferredEvents: [],
		jobDetails: {},
		advancementBonus: 0,
		muster: false,
	};
    it("should return the correct event", () => {
        const {getByText} = render(<EventContainer/>) 
        const testEvent = "testingevent12345"
        testTerm.event = testEvent
        expect(getByText('')).toBe
    });
});

const testTerm = {
	job: "test",
	survived: false,
	advanced: false,
	event: null,
	deferredEvents: [],
	jobDetails: {},
	advancementBonus: 0,
	muster: false,
};
