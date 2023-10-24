import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CareerSpecialty } from "../CareerDetails/CareerTyping";

export interface CareerInfo {
    title: string,
    terms: number,
    rank: number,
    benefits: number,
    muster: boolean,
    details: CareerSpecialty
    commissioned: boolean
    nonComRank?: number
}
export interface JobState {
    jobArray: string[],
    currentJob: string | null
    previousJob: string | null
    careerCount: number
    careerInfo: {
        [key: string]: CareerInfo
    }
}
const initialJobState: JobState = {
    jobArray: [],
    currentJob: null,
    previousJob: null,
    careerCount: 0,
    careerInfo: {}
}


//TODO: middleware must track: saveSurvivedTerm saveFailedTerm selectJob promotion setCommissioned & resolveBenefit
export type AnyCareerPayload = string | {job: string, details: CareerSpecialty} | {job: string} | {job: string, value: number};
const options = {
    name: 'careers',
    initialState: initialJobState,
    reducers: {
        saveSurvivedTerm: (state: JobState, action: PayloadAction<{job: string}>) => {
            const {job} = action.payload;
            state.currentJob = job;
            state.careerInfo[job].terms++;
            state.careerInfo[job].benefits++;
            state.careerInfo[job].muster = false;
            return state;
        },
        saveFailedTerm: (state: JobState, action: PayloadAction<{job: string}>) => {
            const {job} = action.payload;
            state.previousJob = job;
            state.careerInfo[job].muster = true;
            return state;
        },
        selectJob: (state:JobState, action: PayloadAction<{job: string, details: CareerSpecialty}>) => {
            const {job, details} = action.payload;
            if (state.jobArray[state.jobArray.length - 1] !== job){
                state.jobArray.push(job);
            }
            if (state.currentJob !== job) {
                state.previousJob = state.currentJob;
            }
            state.currentJob = job;
            if (!state.careerInfo[job]) {
                state.careerInfo[job] = {
                    title: job, 
                    terms: 0,
                    rank: 0,
                    benefits: 0,
                    muster: false,
                    details: details,
                    commissioned: false,
                }
                state.careerCount++;
            }
            state.careerInfo[job].muster = false;
            return state;

        },
        promotion: (state: JobState) => {
            const currentJob = state.currentJob;
            if (!currentJob) {
                console.warn("Promotion fired without a saved currentJob value! Aborting 'Promotion' action.");
                return;
            }
            const benefitRanks = [0, 2, 4]
            if (benefitRanks.includes(state.careerInfo[currentJob].rank)) {
                state.careerInfo[currentJob].benefits++;
            }
            if (state.careerInfo[currentJob].rank < 6){
                state.careerInfo[currentJob].rank++;
            }
            return state;
        },
        resolveBenefit: (state: JobState, action: PayloadAction<string>) => {
            state.careerInfo[action.payload].benefits--;
            return state;
        },
        addBenefit: (state: JobState, action: PayloadAction<{job: string, value: number}>) => {
            const {job, value} = action.payload;
            state.careerInfo[job].benefits += value;
            return state;
        },
        setCommissioned: (state: JobState, action: PayloadAction<string>) => {
            const job = action.payload;
            state.careerInfo[job].nonComRank = state.careerInfo[job].rank;
            state.careerInfo[job].rank = 1;
            state.careerInfo[job].commissioned = true;
            return state;
        }
    }
}

const careerSlice = createSlice(options);
export const {saveSurvivedTerm, saveFailedTerm, selectJob, promotion, resolveBenefit, addBenefit, setCommissioned} = careerSlice.actions;
export default careerSlice.reducer;

