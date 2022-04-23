import { createSlice } from "@reduxjs/toolkit";

// Alright, goal here is to keep up with an involved list of stats that can be updated both by modifications made *now* and by future career upgrades
const getModifiers = (num) => {
    if (num === 0) {
        return -3
    } else if (num === 1 || num === 2) {
        return (-2);
    } else if (num >= 3 && num < 6) {
        return (-1);
    } else if (num > 5 && num < 9) {
        return 0
    }else if (num > 8 && num < 12) {
        return 1
    } else if (num > 11 && num < 15) {
        return 2
    } else if (num >= 15) {
        return 3
    }
}
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
            const {stat, value} = action.payload;
            state.displayValues = {...state.displayValues, [stat]:value}
            state[stat] = getModifiers(state.displayValues[stat])
            return state;
        },
        increaseStat: (state, action) => {
            state.displayValues[action.payload]++;
            state[action.payload] = getModifiers(state.displayValues[action.payload]);
            return state;
        },
        decreaseStat: (state=startStats, action) => {
            state.displayValues[action.payload]--;
            state[action.payload] = getModifiers(state.displayValues[action.payload]);
            return state;
        },
        changeByAmount: (state, action) => {
            state.displayValues[action.payload.stat] += action.payload.value;
            state[action.payload.stat] = getModifiers(state.displayValues[action.payload.stat]);
            return state;
        },
        setDisplayValue: (state, action) => {
            state.displayValues = {...state.displayValues, ...action.payload}
            return state;
        },
        ageUp: (state) => {
            state.age += 4;
            return state;
        }
    }
}

const statsSlice = createSlice(options);
export const {reset, changeStat, increaseStat, decreaseStat, setDisplayValue, ageUp, changeByAmount} = statsSlice.actions;
export default statsSlice.reducer;