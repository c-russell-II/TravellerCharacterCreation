import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface PrisonState {
	job: string;
	parole: number;
}
const initialState: PrisonState = {
	job: "",
	parole: 0,
};

const options = {
	name: "prison",
	initialState,
	reducers: {
		enterPrison: (
			state: PrisonState,
			action: PayloadAction<{ job: string; parole: number }>
		) => {
			const { job, parole } = action.payload;
			state.job = job;
			state.parole = parole;
			return state;
		},
		changeParole: (state: PrisonState, action: PayloadAction<number>) => {
			state.parole += action.payload;
			return state;
		},
	},
};

const prisonSlice = createSlice(options);

export const { enterPrison, changeParole } = prisonSlice.actions;
export default prisonSlice.reducer;
