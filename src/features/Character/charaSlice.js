import { createSlice } from '@reduxjs/toolkit';

const initialChara = {
    charaName: 'name',
    background: 'none',
    events: [],
    benefits: [],
    numOfCashBenefits: 0,
    trained: false,
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
        addEventBulk: (state, action) => {
            const eventArray = action.payload;
            state = [...state, ...eventArray];
            return state;
        },
        addBenefit: (state, action) => {
            if (action.payload.type === 'money') {
                state.numOfCashBenefits++;
            }
            state.benefits.push(action.payload);
            return state;
        },
        addBenefitBulk: (state, action) => {
            state = [...state, ...action.payload];
            return state;
        },
        resolveCashBenefit: (state) => {
            if (state.numOfCashBenefits > 0) {
                state.numOfCashBenefits--;
            } 
            return state;
        },
        setTrained: (state) => {
            state.trained = true;
            return state;
        }
    }
}

const charaSlice = createSlice(options);


export const {reset, setName, addEvent, addEventBulk, addBenefit, addBenefitBulk, setTrained, resolveCashBenefit} = charaSlice.actions;
export default charaSlice.reducer;
