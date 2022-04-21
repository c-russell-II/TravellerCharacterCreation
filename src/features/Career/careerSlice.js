import { createSlice } from "@reduxjs/toolkit";

const jobState = {
    jobArray: [],
    currentJob: null,
    previousJob: null,
    careerCount: 0
}



const options = {
    name: 'careers',
    initialState: jobState,
    reducers: {
        saveSurvivedTerm: (state, action) => {
            const {job} = action.payload;
            state.currentJob = job;
            state[job].terms++;
            state[job].benefits++;
            state[job].muster = false;
            return state;
        },
        saveFailedTerm: (state, action) => {
            const {job} = action.payload;
            state.previousJob = job;
            state[job].muster = true;
            return state;
        },
        selectJob: (state, action) => {
            const {job, details} = action.payload;
            if (state.jobArray[state.jobArray.length - 1] !== job){
                state.jobArray.push(job);
            }
            if (state.currentJob !== job) {
                state.previousJob = state.currentJob;
            }
            state.currentJob = job;
            if (!state[job]) {
                state[job] = {
                    title: job, 
                    terms: 0,
                    rank: 0,
                    benefits: 0,
                    muster: false,
                    details: details
                }
                state.careerCount++;
            }
            state[job].muster = false;
            return state;

        },
        promotion: (state, action) => {
            if (state[state.currentJob].rank < 6){
                state[state.currentJob].rank++;
            }
            return state;
        },
        resolveBenefit: (state, action) => {
            state[action.payload].benefits--;
            return state;
        }
    }
}

const careerSlice = createSlice(options);
export const {saveSurvivedTerm, saveFailedTerm, selectJob, promotion, resolveBenefit} = careerSlice.actions;
export default careerSlice.reducer;

