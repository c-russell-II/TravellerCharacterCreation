import { createSlice } from "@reduxjs/toolkit";

const jobState = {
    jobArray: [],
    currentJob: null,
    previousJob: null,
}



const options = {
    name: 'careers',
    initialState: jobState,
    reducers: {
        survivedTerm: (state, action) => {
            const {job, event} = action.payload;
            if (!state[job]) {
                state[job] = {
                    title: job, 
                    events: [event],
                    terms: 0,
                    rank: 0,
                    benefits: 0,
                    muster: false,
                }
            }
            state.currentJob = job;
            state[job].events.push(event);
            state[job].terms++;
            state[job].benefits++;
            state[job].muster = false;
            return state;
        },
        advancedTerm: (state, action) => {
            const {job, event} = action.payload;
            if (!state[job]) {
                state[job] = {
                    title: job, 
                    events: [event],
                    terms: 0,
                    rank: 0,
                    benefits: 0,
                    muster: false,
                }
            }
            state.currentJob = job;
            state[job].events.push(event);
            state[job].terms++;
            state[job].benefits++;
            if (state[job].rank < 6) {
                state[job].rank++;
            }
            state[job].muster = false;
            return state;
        },
        failedTerm: (state, action) => {
            const {job, event} = action.payload;
            if (!state[job]) {
                state[job] = {
                    title: job, 
                    events: [event],
                    terms: 0,
                    rank: 0,
                    benefits: 0,
                    muster: false,
                }
            }
            state.previousJob = job;
            state[job].events.push(event);
            state[job].muster = true;
            return state;
        },
        selectJob: (state, action) => {
            const {job} = action.payload;
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
                    events: [],
                    terms: 0,
                    rank: 0,
                    benefits: 0,
                    muster: false,
                }
            }
            state[job].muster = false;
            return state;

        },
        promotion: (state, action) => {
            if (state[state.currentJob] < 6){
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
export const {survivedTerm, advancedTerm, failedTerm, selectJob, promotion, resolveBenefit} = careerSlice.actions;
export default careerSlice.reducer;

