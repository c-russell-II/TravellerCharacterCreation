import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    benefits: {},
    contacts: [],
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
                    if ('value' in state.qualification[e]) {
                        state.qualification[e].value += value;
                        return state;
                    }
                    state.qualification[e].value = value;
                    return state;
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
            const { value, description } = action.payload;
            state.contacts.push({number: value, description: description})
            return state;
        },
        addRival: (state, action) => {
            const {value, description} = action.payload;
            state.rivals.push({number: value, description: description})
            return state;
        },
        addAlly: (state, action) => {
            const {value, description} = action.payload;
            state.allies.push({number: value, description: description});
            return state;
        },
        addEnemy: (state, action) => {
            const {value, description} = action.payload;
            state.enemies.push({number: value, description: description});
            return state;
        },
        removeFriend: (state, action) => {
            const {type, index} = action.payload;
            if (type === 'contact') {
                if (state.contacts[index].value > 1) {
                    state.contacts[index].value --;
                    return state;
                }
                state.contacts.slice(index, index + 1);
                return state;
            }
            if (type === 'ally') {
                if (state.allies[index].value > 1) {
                    state.allies[index].value --;
                    return state;
                }
                state.allies.slice(index, index + 1);
                return state;
            }
        }
    }
}

const miscSlice = createSlice(options);

export const {reset, addQualificationBonus, addBenefitBonus, addContact, removeBenefitBonus, addRival, addAlly, addEnemy, removeFriend} = miscSlice.actions;
export default miscSlice.reducer;