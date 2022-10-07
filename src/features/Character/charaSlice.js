import { createSlice } from '@reduxjs/toolkit';

export const initialChara = {
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
        reset: state => initialChara,
        setName: (state, action) => {
            state.charaName = action.payload;
            return state;
        },
        addEvent: (state, action) => {
            state.events.push(action.payload);
            return state;
        },
        addBenefit: (state, action) => {
            if (action.payload.type === 'money') {
                state.numOfCashBenefits++;
            }
            state.benefits.push(action.payload);
            return state;
        },
        setTrained: (state) => {
            state.trained = true;
            return state;
        },
        setDrafted: (state) => {
            state.drafted = true;
            return state;
        },
        anagathicsTerm: (state) => {
            state.anagathics.using = true;
            state.anagathics.terms ++;
            state.anagathics.total ++;
            return;
        },
        anagathicEnd: (state) => {
            state.anagathics.using = false;
            state.anagathics.terms = 0;
            return state;
        },
        addDebt: (state, action) => {
            state.debt += action.payload;
        }
    }
}

const charaSlice = createSlice(options);


export const {reset, setName, addEvent, addBenefit, setTrained, setDrafted, anagathicsTerm, anagathicEnd, addDebt} = charaSlice.actions;
export default charaSlice.reducer;
