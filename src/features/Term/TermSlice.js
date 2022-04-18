import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    job: '',
    survived: false,
    advanced: false,
    event: null,
    jobDetails: {},
    advancementBonus: 0,
    muster: false,
}

const options = {
    name: 'term',
    initialState: initialState,
    reducers: {
        survivedTerm: (state, action) => {
            const {job, event, jobDetails} = action.payload;
            state.job = job;
            state.survived = true;
            state.event = event;
            state.jobDetails = jobDetails;
            return state;
        },
        failedTerm: (state, action) => {
            const {job, event, jobDetails} = action.payload;
            state.job = job;
            state.survived = false;
            state.event = event;
            state.jobDetails = jobDetails;
            return state;
        },
        advancementBonus: (state, action) => {
            state.advancementBonus = action.payload;
            return state;
        },
        updateEvent: (state, action) => {
            state.event = action.payload;
            return state;
        },
        resolveEvent: (state) => {
            state.event = null;
            return state;
        },
        resolveTerm: (state) => {
            state = initialState;
            return state;
        }
    },
}

const termSlice = createSlice(options);

export const {survivedTerm, failedTerm, advancementBonus, updateEvent, resolveEvent, resolveTerm} = termSlice.actions;
export default termSlice.reducer;