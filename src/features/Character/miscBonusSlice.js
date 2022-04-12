import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    benefits: {},
    contacts: {},
    allies: [],
    rivals: [],
    enemies: [],
    advancement: {},
    qualification: {},
    injuries: {}
}

const options = {
    name: 'misc',
    initialState: initialState,
    reducers: {
        reset: state => initialState,
        addQualificationBonus: (state, action) => {
            const bonusObj = {
                careers: action.payload.careers,
                value: action.payload.value,
                expires: action.payload.age + action.payload.duration
            }
            state.qualification[`${action.payload.source}${action.payload.age}`] = bonusObj
            return state;
        },
        addBenefitBonus: (state, action) => {
            const {career, value} = action.payload;
            if (state.benefits[career][value]) {
                state.benefits[career][value]++;
            } else {
                state.benefits[career][value] = 1;
            }
            return state;
        },
        addContact: (state, action) => {
            const {career, value} = action.payload;
            if (state.contacts[career]) {
                state.contacts[career]+= value;
            } else {
                state.contacts[career] = value;
            }
            return state;
        },
        addAdvancementBonus: (state, action) => {
            const bonusObj = {
                career: action.payload.career,
                value: action.payload.value,
                age: action.payload.age,
                expires: action.payload.age + action.payload.duration
            }
            state.advancement[`${action.payload.career}${action.payload.age}`] = bonusObj;
            return state;
        }
    }
}

const miscSlice = createSlice(options);

export const {reset, addQualificationBonus, addBenefitBonus, addContact, addAdvancementBonus} = miscSlice.actions;
export default miscSlice.reducer;