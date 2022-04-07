import { createSlice } from "@reduxjs/toolkit";

// Alright, goal here is to keep up with an involved list of stats that can be updated both by modifications made *now* and by future career upgrades

const startStats = {
    str: 0,
    dex: 0,
    end: 0,
    int: 0,
    edu: 0,
    soc: 0,
    age: 18,
    displayValues: {
        str: 0,
        dex: 0,
        end: 0,
        int: 0,
        edu: 0,
        soc: 0,
    }
    
}

const options = {
    name: 'stats',
    initialState: startStats,
    reducers: {
        reset: state => startStats,
        changeStat: (state, action) => {
            const stat = action.payload
            return {...state, ...stat};
        },
        increaseStat: (state, action) => {
            state[action.payload]++;
            return state;
        },
        decreaseStat: (state=startStats, action) => {
            state[action.payload]--;
            return state;
        },
        setDisplayValue: (state, action) => {
            state.displayValues = {...state.displayValues, ...action.payload}
            return state;
        }
    }
}

const statsSlice = createSlice(options);
export const {reset, changeStat, increaseStat, decreaseStat, setDisplayValue} = statsSlice.actions;
export default statsSlice.reducer;