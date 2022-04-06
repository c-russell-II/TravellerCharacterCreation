import { createSlice } from '@reduxjs/toolkit';

const initialChara = {
    charaName: 'name',
    background: 'none',
    events: [],
    benefits: [],
}


const options = {
    name: 'chara',
    initialState: initialChara,
    reducers: {
        reset: state => initialChara,
        setName: (state, action) => {
            state.name = action.payload;
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
            state.benefits.push(action.payload);
            return state;
        },
        addBenefitBulk: (state, action) => {
            state = [...state, ...action.payload];
            return state;
        }
    }
}

const charaSlice = createSlice(options);


export const {reset, setName, addEvent, addEventBulk, addBenefit, addBenefitBulk} = charaSlice.actions;
export default charaSlice.reducer;
