import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    job: '',
    survived: false,
    advanced: false,
    event: null,
    jobDetails: {}
}

const options = {
    name: 'term',
    initialState: initialState,
    reducers: {
        setCurrentTerm: (state, action) => {
            return {...action.payload};
        },
        resolveEvent: (state) => {
            state.event = null;
            return state;
        }
    },
}

const termSlice = createSlice(options);

export const {setCurrentTerm, resolveEvent} = termSlice.actions;
export default termSlice.reducer;