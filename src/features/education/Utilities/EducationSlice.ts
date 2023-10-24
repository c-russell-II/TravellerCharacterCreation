import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//TODO: major/spec and minor/spec in eduSlice! I think I need to readjust the way that I checked whether to render a specialty for Major/Minor
interface EduSlice {
    ageEntered: number,
    school?: string,
    graduated: boolean,
    honors: boolean,
    major: string,
    majorSpecialty: string,
    minor: string,
    minorSpecialty: string
}
const initialState: EduSlice = {
    ageEntered: 18,
    graduated: false,
    honors: false,
    major: '',
    majorSpecialty: '',
    minor: '',
    minorSpecialty: '',
}

//TODO: Middleware must track school choice, graduation, and honors actions
const options = {
    name: 'education',
    initialState: initialState,
    reducers: {
        chooseSchool: (state: EduSlice, action: PayloadAction<{school: string, age: number}>) => {
            const {school, age} = action.payload;
            state.school = school;
            state.ageEntered = age;
            return state;
        },
        chooseMajor: (state: EduSlice, action: PayloadAction<{skill: string, specialty?: string}>) => {
            const {skill, specialty} = action.payload
            if (specialty) {
                state.majorSpecialty = specialty;
            }
            state.major = skill;
            return;
        },
        chooseMinor: (state: EduSlice, action: PayloadAction<{skill: string, specialty?: string}>) => {
            const {skill, specialty} = action.payload;
            if (specialty) {
                state.minorSpecialty = specialty;
            }
            state.minor = skill;
            return;
        },
        setGraduated: (state: EduSlice) => {
            state.graduated = true;
            return state;
        },
        setHonors: (state: EduSlice) => {
            state.graduated = true;
            state.honors = true;
            return state;
        }
    }
}

const educationSlice = createSlice(options);

export const {chooseSchool, chooseMajor, chooseMinor, setGraduated, setHonors} = educationSlice.actions;
export default educationSlice.reducer;