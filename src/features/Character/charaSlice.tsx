import { createSlice } from '@reduxjs/toolkit';
type Anagathics = {
    using: boolean
    terms: number
    total: number
}
interface Chara {
    charaName: string
    background: string
    events: any[]
    benefits: any[]
    numOfCashBenefits: number
    trained: boolean
    drafted: boolean
    debt: number
    anagathics: Anagathics
}
export const initialChara: Chara = {
    charaName: 'name',
    background: 'none',
    events: [],
    benefits: [],
    numOfCashBenefits: 0,
    trained: false,
    drafted: false,
    debt: 0,
    anagathics: {
        using: false,
        terms: 0,
        total: 0,
    }
}


const options = {
    name: 'chara',
    initialState: initialChara,
    reducers: {
        reset: (state: Chara) => initialChara,
        setName: (state: Chara, action: {payload: string}) => {
            state.charaName = action.payload;
            return state;
        },
        addEvent: (state: Chara, action: {payload: string}) => {
            state.events.push(action.payload);
            return state;
        },
        //TODO: Benefit typing in chara slice!
        addBenefit: (state: Chara, action: {payload: any}) => {
            if (action.payload.type === 'money') {
                state.numOfCashBenefits++;
            }
            state.benefits.push(action.payload);
            return state;
        },
        setTrained: (state: Chara) => {
            state.trained = true;
            return state;
        },
        setDrafted: (state: Chara) => {
            state.drafted = true;
            return state;
        },
        anagathicsTerm: (state: Chara) => {
            state.anagathics.using = true;
            state.anagathics.terms ++;
            state.anagathics.total ++;
            return;
        },
        anagathicEnd: (state: Chara) => {
            state.anagathics.using = false;
            state.anagathics.terms = 0;
            return state;
        },
        addDebt: (state: Chara, action: {payload: number}) => {
            state.debt += action.payload;
        }
    }
}

const charaSlice = createSlice(options);


export const {reset, setName, addEvent, addBenefit, setTrained, setDrafted, anagathicsTerm, anagathicEnd, addDebt} = charaSlice.actions;
export default charaSlice.reducer;
