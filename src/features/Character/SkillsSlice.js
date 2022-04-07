import { createSlice } from "@reduxjs/toolkit";

const initialSkills = {
    Admin: {specialties: false, value: -3},
    Advocate: {specialties: false, value: -3},
    Animals: {specialties: true,
        specialtiesList: ['handling', 'training', 'veterinary'],
        handling: -3,
        training: -3,
        veterinary: -3
    },
    Athletics: {specialties: true,
        specialtiesList: ['dexterity', 'endurance', 'strength'],
        dexterity: -3,
        endurance: -3,
        strength: -3,
    },
    Art: {specialties: true,
        specialtiesList: ['performer', 'holography', 'instrument', 'visual', 'write'],
    },
    Astrogation: {specialties: false, value: -3},
    Broker: {specialties: false, value: -3},
    Carouse: {specialties: false, value: -3},
    Diplomat: {specialties: false, value: -3},
    Drive: {specialties: true,
        specialtiesList: ['hovercraft', 'mole', 'track', 'walker', 'wheel'],
    },
    Electronics: { specialties: true,
        specialtiesList: ['comms', 'computers', 'remoteOps', 'sensors'],
    },
    Engineer: {specialties: true,
        specialtiesList: ['mDrive', 'jDrive', 'lifeSupport', 'power'],
    },
    Explosives: {specialties: false, value: -3},
    Flyer: {specialties: true,
        specialtiesList: ['airship', 'grav', 'ornithopter', 'rotor', 'wing'],
    },
    Gambler: {specialties: false, value: -3},
    Gunner: {specialties: true,
        specialtiesList: ['turret', 'ortillery', 'screens', 'capital'],
        turret: -3,
        ortillery: -3
    },
    GunCombat: {specialties: true,
        specialtiesList: ['archaic', 'energy', 'slug'],
        archaic: -3,
        energy: -3,
        slug: -3,
    },
    HeavyWeapons: {specialties: true,
        specialtiesList: ['artillery', 'manPortable', 'vehicle'],
    },
    Investigate: {specialties: false, value: -3},
    JackOfAllTrades: {specialties: false, value: -3},
    Language: {specialties: true, 
        specialtiesList: [],
    },
    Leadership: {specialties: false, value: -3},
    Mechanic: {specialties: false, value: -3},
    Medic: {specialties: false, value: -3},
    Melee: {specialties: true,
        specialtiesList: ['unarmed', 'blade', 'bludgeon', 'natural'],
    },
    Navigation: {specialties: false, value: -3},
    Persuade: {specialties: false, value: -3},
    Pilot: {specialties: true,
        specialtiesList: ['small', 'spacecraft', 'capital'],
        small: -3,
        spacecraft: -3,
        capital: -3,
    },
    Profession: {specialties: true, 
        specialtiesList: [],
    },
    Recon: {specialties: false, value: -3},
    Science: {specialties: true,
        specialtiesList: [],
    },
    Seafarer: {specialties: true,
        specialtiesList: [],
    },
    Stealth: {specialties: false, value: -3},
    Steward: {specialties: false, value: -3},
    Streetwise: {specialties: false, value: -3},
    Survival: {specialties: false, value: -3},
    Tactics: {specialties: true,
        specialtiesList: ['naval', 'military'],
        naval: -3,
        military: -3,
    },
    VaccSuit: {specialties: false, value: -3},
    specialtySkills: ['Animals', 'Athletics', 'Art', 'Drive', 'Electronics', 'Engineer', 'Flyer', 'Gunner', 'Gun Combat', 'Heavy Weapons', 'Language', 'Melee', 'Pilot', 'Science', 'Seafarer', 'Tactics'],
}

const options = {
    name: 'skills',
    initialState: initialSkills,
    reducers: {
        reset: state => initialSkills,
        increaseToZero: (state, action) => {
            const skill = action.payload;
            if (state[skill].value >= 0) {
                return state;
            }
            if (state[skill].specialties) {
                if (state[skill].specialtiesList.length > 0) {
                    state[skill].specialtiesList.forEach((e) => {
                        state[skill][e] = 0;
                    });
                }
                state[skill].trained = true;
                return state;
            }
            state[skill].value = 0;

            return state;
        },
        genericIncrease: (state, action) => {
            const skill = action.payload.skill
            if (state[skill].specialties) {
                if (!state[skill].trained) {
                    state[skill].trained = true;
                    return state;
                }
                const specialty = action.payload.specialty
                const list = state[skill].specialtiesList;
                if (!list.includes(specialty)) {
                    state[skill].specialtiesList.push(specialty)
                    state[skill][specialty] = 1;
                }
                if (state[skill][specialty] > 0) {
                    state[skill][specialty]++
                    return state;
                }
                state[skill][specialty] = 1;
                return state;
            }
            if (state[skill].value >= 0) {
                state[skill].value++;
                return state;
            }
            state[skill].value = 1;
            return state;
        },
        setValue: (state, action) => {
            const skill = action.payload.skill;
            const value = action.payload.value;
            if (state[skill].specialties) {
                state[skill].trained = true;
                const list = state[skill].specialtiesList;
                const specialty = action.payload.specialty;
                if (!list.includes(specialty)) {
                    state[skill].specialtiesList.push(specialty)
                    state[skill][specialty] = value;
                }
                if (state[skill][specialty] >= 0) {
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

export const {reset, increaseToZero, genericIncrease, setValue} = skillsSlice.actions;
export default skillsSlice.reducer;