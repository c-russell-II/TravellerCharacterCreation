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
                    muster: false,
                }
            }
            state.currentJob = job;
            state[job].events.push(event);
            state[job].terms++;
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
                    muster: false,
                }
            }
            state.currentJob = job;
            state[job].events.push(event);
            state[job].terms++;
            if (state[job].rank < 6) {
                state[job].rank++;
            }
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
            if (state.jobArray[0] !== job){
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
                    muster: false,
                }
            }

        }
    }
}

const careerSlice = createSlice(options);
export const {survivedTerm, advancedTerm, failedTerm, selectJob} = careerSlice.actions;
export default careerSlice.reducer;

