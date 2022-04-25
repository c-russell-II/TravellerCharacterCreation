import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    job: '',
    parole: 0
}

const options = {
    name: 'prison',
    initialState,
    reducers: {
        enterPrison: (state, action) => {
            const {job, parole} = action.payload;
            state.job = job;
            state.parole= parole;
            return state;
        },
        changeParole: (state, action) => {
            state.parole += action.payload;
            return state;
        }
    }
}

const prisonSlice = createSlice(options);

export const {enterPrison, changeParole} = prisonSlice.actions;
export default prisonSlice.reducer;