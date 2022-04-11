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
        },
        addBenefitBonus: (state, action) => {
            const {career, value} = action.payload;
            if (state.benefits[career][value]) {
                state.benefits[career][value]++;
            } else {
                state.benefits[career][value] = 1;
            }
            return state;
        }
    }
}

const miscSlice = createSlice(options);

export const {reset, addQualificationBonus, addBenefitBonus} = miscSlice.actions;
export default miscSlice.reducer;