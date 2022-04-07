import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    benefits: {},
    contacts: [],
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
                age: action.payload.age,
                expires: action.payload.age + action.payload.duration
            }
            return {...state, [`${action.payload.source}${action.payload.age}`]: bonusObj}
        }
    }
}

const miscSlice = createSlice(options);

export const {reset, addQualificationBonus} = miscSlice.actions;
export default miscSlice.reducer;