import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    benefits: {},
    contacts: {},
    allies: [],
    rivals: [],
    enemies: [],
    qualification: {list: [], temp: {list: []}},
    injuries: {}
}

const options = {
    name: 'misc',
    initialState: initialState,
    reducers: {
        reset: state => initialState,
        addQualificationBonus: (state, action) => {
            const {careers, value, isTemp, age} = action.payload;
            if (isTemp) {
                careers.forEach((e) => {
                    state.qualification.temp[e].value += value;
                    state.qualification.temp[e].expiration = age;
                    state.qualification.temp.list.push([e])
                })

            }
            careers.forEach((e) => {
                if (e in state.qualification) {
                    if (!state.qualification[e]?.value) {
                        state.qualification[e].value += value;
                        return state;
                    }
                    state.qualification[e].value = value;
                }
            state.qualification[e] = {value: value}
            })
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