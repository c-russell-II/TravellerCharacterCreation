import { createSlice } from "@reduxjs/toolkit";

// Alright, goal here is to keep up with an involved list of stats that can be updated both by modifications made *now* and by future career upgrades
const getModifiers = (num: number | undefined): number => {
    if (num === undefined) {
        console.error("Get Modifiers called with undefined value");
        return 0;
    }
    if (num < 0) {
        return -4;
    }
	if (num === 0) {
		return -3;
	} else if (num === 1 || num === 2) {
		return -2;
	} else if (num >= 3 && num < 6) {
		return -1;
	} else if (num > 5 && num < 9) {
		return 0;
	} else if (num > 8 && num < 12) {
		return 1;
	} else if (num > 11 && num < 15) {
		return 2;
	} else {
		return 3;
	}
};

interface StatState extends CharaStats {
	displayValues: StatDisplayHolder;
	injuryHolder: InjuryHolder;
}
export const startStats: StatState = {
	str: 0,
	dex: 0,
	end: 0,
	int: 0,
	edu: 0,
	soc: 0,
    psi: 0,
	age: 18,
	displayValues: {
		str: 0,
		dex: 0,
		end: 0,
		int: 0,
		edu: 0,
		soc: 0,
        psi: 0
	},
	injuryHolder: {
		str: 0,
		dex: 0,
		end: 0,
		int: 0,
		edu: 0,
	},
};
const options = {
	name: "stats",
	initialState: startStats,
	reducers: {
		reset: () => startStats,
		changeStat: (
			state: StatState,
			action: {
				payload: { stat: keyof StatDisplayHolder, value: number };
			}
		) => {
			const { stat, value } = action.payload;
			state.displayValues = { ...state.displayValues, [stat]: value };
			state[stat] = getModifiers(value);
			return state;
		},
		increaseStat: (
			state: StatState,
			action: { payload: keyof StatDisplayHolder }
		) => {
            state.displayValues[action.payload]!++;
            state[action.payload] = getModifiers(
                state.displayValues[action.payload]!
            );
            return state;
		},
		decreaseStat: (
			state: StatState = startStats,
			action: { payload: keyof StatDisplayHolder }
		) => {
            state.displayValues[action.payload]--;
            state[action.payload] = getModifiers(
                state.displayValues[action.payload]
            );
            return state;
		},
		changeByAmount: (
			state: StatState,
			action: { payload: { stat: keyof StatDisplayHolder; value: number } }
		) => {
            const {stat, value} = action.payload;
			if (value < 0 && stat !== "soc" && stat !== "psi") {
				state.injuryHolder[stat] -= value;
			}
			state.displayValues[stat] += value;
			state[stat] = getModifiers(
                state.displayValues[stat]
			);
			return state;
		},
		setDisplayValue: (state: StatState, action: {payload: {stat: keyof StatDisplayHolder, value: number}}) => {
			state.displayValues = { ...state.displayValues, ...action.payload };
			return state;
		},
		ageUp: (state: StatState) => {
			state.age += 4;
			return state;
		},
		clearInjuryHolder: (state: StatState) => {
			state.injuryHolder = {
				str: 0,
				dex: 0,
				end: 0,
				int: 0,
				edu: 0,
			};
			return state;
		},
		addPsi: (state: StatState, action: {payload: number}) => {
			state.displayValues.psi = action.payload;
			state.psi = getModifiers(action.payload);
			return state;
		},
	},
};

const statsSlice = createSlice(options);
export const {
	reset,
	changeStat,
	increaseStat,
	decreaseStat,
	setDisplayValue,
	ageUp,
	changeByAmount,
	clearInjuryHolder,
	addPsi,
} = statsSlice.actions;
export default statsSlice.reducer;
