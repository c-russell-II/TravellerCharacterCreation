import { createSlice } from "@reduxjs/toolkit";

const initialSkills = {
    Admin: {specialties: false, value: null},
    Advocate: {specialties: false, value: null},
    Animals: {specialties: true,
        specialtiesList: ['handling', 'training', 'veterinary'],
        handling: null,
        training: null,
        veterinary: null
    },
    Athletics: {specialties: true,
        specialtiesList: ['dexterity', 'endurance', 'strength'],
        dexterity: null,
        endurance: null,
        strength: null,
    },
    Art: {specialties: true,
        specialtiesList: [],
    },
    Astrogation: {specialties: false, value: null},
    Broker: {specialties: false, value: null},
    Carouse: {specialties: false, value: null},
    Diplomat: {specialties: false, value: null},
    Drive: {specialties: true,
        specialtiesList: [],
    },
    Electronics: { specialties: true,
        specialtiesList: [],
    },
    Engineer: {specialties: true,
        specialtiesList: [],
    },
    Explosives: {specialties: false, value: null},
    Flyer: {specialties: true,
        specialtiesList: [],
    },
    Gambler: {specialties: false, value: null},
    Gunner: {specialties: true,
        specialtiesList: ['turret', 'artillery'],
        turret: null,
        artillery: null
    },
    GunCombat: {specialties: true,
        specialtiesList: ['archaic', 'energy', 'slug'],
        archaic: null,
        energy: null,
        slug: null,
    },
    HeavyWeapons: {specialties: true,
        specialtiesList: [],
    },
    Investigate: {specialties: false, value: null},
    JackOfAllTrades: {specialties: false, value: null},
    Language: {specialties: true, 
        specialtiesList: [],
    },
    Leadership: {specialties: false, value: null},
    Mechanic: {specialties: false, value: null},
    Medic: {specialties: false, value: null},
    Melee: {specialties: true,
        specialtiesList: [],
    },
    Navigation: {specialties: false, value: null},
    Persuade: {specialties: false, value: null},
    Pilot: {specialties: true,
        specialtiesList: ['small', 'spacecraft', 'capital'],
        small: null,
        spacecraft: null,
        capital: null,
    },
    Profession: {specialties: true, 
        specialtiesList: [],
    },
    Recon: {specialties: false, value: null},
    Science: {specialties: true,
        specialtiesList: [],
    },
    Seafarer: {specialties: true,
        specialtiesList: [],
    },
    Stealth: {specialties: false, value: null},
    Steward: {specialties: false, value: null},
    Streetwise: {specialties: false, value: null},
    Survival: {specialties: false, value: null},
    Tactics: {specialties: true,
        specialtiesList: ['naval', 'military'],
        naval: null,
        military: null,
    },
    VaccSuit: {specialties: false, value: null},
}

const options = {
    name: 'skills',
    initialState: initialSkills,
    reducers: {
        reset: state => initialSkills,
        genericIncrease: (state, action) => {
            const skill = action.payload.skill
            if (state[skill].specialties) {
                const specialty = action.payload.specialty
                const list = state[skill].specialtiesList;
                if (!list.includes(specialty)) {
                    state[skill].specialtiesList.push(specialty)
                    state[skill][specialty] = 0;
                }
                if (state[skill][specialty] || state[skill][specialty] === 0) {
                    state[skill][specialty]++
                    return state;
                }
                state[skill][specialty] = 0;
                return state;
            }
            if (state[skill].value || state[skill].value === 0) {
                state[skill].value++;
                return state;
            }
            state[skill].value = 0;
            return state;
        },
        setValue: (state, action) => {
            const skill = action.payload.skill;
            const value = action.payload.value;
            if (state[skill].specialties) {
                const list = state[skill].specialtiesList;
                const specialty = action.payload.specialty;
                if (!list.includes(specialty)) {
                    state[skill].specialtiesList.push(specialty)
                    state[skill][specialty] = value;
                }
                if (state[skill][specialty] || state[skill][specialty] === 0) {
                    if (state[skill][specialty] >= value) {
                        return state
                    }
                }
                state[skill][specialty] = value;
                return state;
            }
            if (state[skill].value >= value) {
                return state;
            }
            state[skill].value = value;
            return state;
        }
    }
}

const skillsSlice = createSlice(options);

export const {reset, genericIncrease, setValue} = skillsSlice.actions;
export default skillsSlice.reducer;