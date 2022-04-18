import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    benefits: {},
    contacts: {},
    allies: [],
    rivals: [],
    enemies: [],
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
            const tempList = state.qualification.list.concat(action.payload.careers);
            state.qualification.list = tempList;
            state.qualification[`${action.payload.source}${action.payload.age}`] = bonusObj
            return state;
        },
        addBenefitBonus: (state, action) => {
            const {career, value} = action.payload;
            if (state.benefits[career]){
                if (state.benefits[career][value]) {
                    state.benefits[career][value]++;
                } else {
                    state.benefits[career][value] = 1;
                }
            } else {
                state.benefits[career]= {[value]: 1};
            }
            return state;
        },
        removeBenefitBonus: (state, action) => {
            const {career, value} = action.payload;
            if (state.benefits[career]) {
                if (state.benefits[career][value] > 1) {
                    state.benefits[career][value]--;
                    return state;
                } else if (state.benefits[career][value] === 1) {
                    state.benefits[career][value] = null;
                    return state;
                }
            } return state;
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
    }
}

const miscSlice = createSlice(options);

export const {reset, addQualificationBonus, addBenefitBonus, addContact, removeBenefitBonus} = miscSlice.actions;
export default miscSlice.reducer;