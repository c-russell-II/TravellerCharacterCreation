import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ageEntered: 18,
    school: null,
    graduated: false,
    honors: false,
    major: null,
    majorSpecialty: null,
    minor: null,
    minorSpecialty: null,
}

const options = {
    name: 'education',
    initialState: initialState,
    reducers: {
        chooseSchool: (state, action) => {
            const {school, age} = action.payload;
            state.school = school;
            state.ageEntered = age;
            return state;
        },
        chooseMajor: (state, action) => {
            const {skill, specialty} = action.payload
            if (specialty) {
                state.majorSpecialty = specialty;
            }
            state.major = skill;
            return;
        },
        chooseMinor: (state, action) => {
            const {skill, specialty} = action.payload;
            if (specialty) {
                state.minorSpecialty = specialty;
            }
            state.minor = skill;
            return;
        },
        setGraduated: (state) => {
            state.graduated = true;
            return state;
        },
        setHonors: (state) => {
            state.graduated = true;
            state.honors = true;
            return state;
        }
    }
}

const educationSlice = createSlice(options);

export const {chooseSchool, chooseMajor, chooseMinor, setGraduated, setHonors} = educationSlice.actions;
export default educationSlice.reducer;