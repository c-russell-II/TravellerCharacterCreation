import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TempQualBonus {
    value: number,
    expiration?: number
}

export interface QualBonuses {
        list: any[],
        details: {[key: string]: {value: number}},
        temp: {
            list: any[]
            details: {
                [key: string]: TempQualBonus
            }
        }
    }
interface MiscBonusSlice {
    benefits: {
        [key: string]: {[key: number]: number}
    },
    contacts: any[],
    allies: any[],
    rivals: any[],
    enemies: any[],
    qualification: QualBonuses
    injuries: {},
}
const initialState: MiscBonusSlice = {
    benefits: {},
    contacts: [],
    allies: [],
    rivals: [],
    enemies: [],
    qualification: {list: [], temp: {list: [], details: {}}, details: {}},
    injuries: {}
}

interface QualBonusPayload {
    careers: string[],
    value: number,
    isTemp: boolean,
    age: number
}

const options = {
    name: 'misc',
    initialState: initialState,
    reducers: {
        reset: (state: MiscBonusSlice) => initialState,
        addQualificationBonus: (state: MiscBonusSlice, action: PayloadAction<QualBonusPayload>) => {
            const {careers, value, isTemp, age} = action.payload;
            if (isTemp) {
                careers.forEach((e) => {
                    state.qualification.temp.details[e].value += value;
                    state.qualification.temp.details[e].expiration = age;
                    state.qualification.temp.list.push(e)
                })

            }
            careers.forEach((e) => {
                if (e in state.qualification.details) {
                    if ('value' in state.qualification.details[e]) {
                        state.qualification.details[e].value += value;
                        return state;
                    }
                    state.qualification.details[e].value = value;
                    return state;
                }
            state.qualification.details[e] = {value: value}
            state.qualification.list.push(e);
            })
            return state;
        },
        addBenefitBonus: (state: MiscBonusSlice, action: PayloadAction<{career: string, value: number}>) => {
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
        removeBenefitBonus: (state: MiscBonusSlice, action: PayloadAction<{career: string, value: number}>) => {
            const {career, value} = action.payload;
            if (state.benefits[career]) {
                if (state.benefits[career][value] > 1) {
                    state.benefits[career][value]--;
                    return state;
                } else if (state.benefits[career][value] === 1) {
                    state.benefits[career][value] = 0;
                    return state;
                }
            } return state;
        },
        addContact: (state: MiscBonusSlice, action: PayloadAction<{value: number, description: string}>) => {
            const { value, description } = action.payload;
            state.contacts.push({number: value, description: description})
            return state;
        },
        addRival: (state: MiscBonusSlice, action: PayloadAction<{value: number, description: string}>) => {
            const {value, description} = action.payload;
            state.rivals.push({number: value, description: description})
            return state;
        },
        addAlly: (state: MiscBonusSlice, action: PayloadAction<{value: number, description: string}>) => {
            const {value, description} = action.payload;
            state.allies.push({number: value, description: description});
            return state;
        },
        addEnemy: (state: MiscBonusSlice, action: PayloadAction<{value: number, description: string}>) => {
            const {value, description} = action.payload;
            state.enemies.push({number: value, description: description});
            return state;
        },
        removeFriend: (state: MiscBonusSlice, action: PayloadAction<{type: string, index: number}>) => {
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