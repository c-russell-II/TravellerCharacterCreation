import { createSlice } from "@reduxjs/toolkit";

const initialSkills = {
    Admin: { specialties: false, value: -3 },
    Advocate: { specialties: false, value: -3 },
    Animals: {
        specialties: true,
        specialtiesList: ['handling', 'training', 'veterinary'],
        handling: -3,
        training: -3,
        veterinary: -3,
        trained: false,
    },
    Athletics: {
        specialties: true,
        specialtiesList: ['dexterity', 'endurance', 'strength'],
        dexterity: -3,
        endurance: -3,
        strength: -3,
        trained: false,
    },
    Art: {
        specialties: true,
        specialtiesList: ['performer', 'holography', 'instrument', 'visual', 'write'],
        performer: -3,
        holography: -3,
        instrument: -3,
        visual: -3,
        write: -3,
        trained: false,
    },
    Astrogation: { specialties: false, value: -3 },
    Broker: { specialties: false, value: -3 },
    Carouse: { specialties: false, value: -3 },
    Diplomat: { specialties: false, value: -3 },
    Deception: { specialties: false, value: -3},
    Drive: {
        specialties: true,
        specialtiesList: ['hovercraft', 'mole', 'track', 'walker', 'wheel'],
        hovercraft: -3,
        mole: -3,
        track: -3,
        walker: -3,
        wheel: -3,
        trained: false,
    },
    Electronics: {
        specialties: true,
        specialtiesList: ['comms', 'computers', 'remoteOps', 'sensors'],
        comms: -3,
        computers: -3,
        remoteOps: -3,
        sensors: -3,
        trained: false,
    },
    Engineer: {
        specialties: true,
        specialtiesList: ['mDrive', 'jDrive', 'lifeSupport', 'power'],
        mDrive: -3,
        jDrive: -3,
        lifeSupport: -3,
        power: -3,
        trained: false,
    },
    Explosives: { specialties: false, value: -3 },
    Flyer: {
        specialties: true,
        specialtiesList: ['airship', 'grav', 'ornithopter', 'rotor', 'wing'],
        airship: -3,
        grav: -3,
        ornithopter: -3,
        rotor: -3,
        wing: -3,
    },
    Gambler: { specialties: false, value: -3 },
    Gunner: {
        specialties: true,
        specialtiesList: ['turret', 'ortillery', 'screens', 'capital'],
        turret: -3,
        ortillery: -3,
        screens: -3,
        capital: -3,
        trained: false,
    },
    GunCombat: {
        specialties: true,
        specialtiesList: ['archaic', 'energy', 'slug'],
        archaic: -3,
        energy: -3,
        slug: -3,
        trained: false,
    },
    HeavyWeapons: {
        specialties: true,
        specialtiesList: ['artillery', 'manPortable', 'vehicle'],
        artillery: -3,
        manPortable: -3,
        vehicle: -3,
        trained: false,
    },
    Investigate: { specialties: false, value: -3 },
    JackOfAllTrades: { specialties: false, value: -3 },
    Language: {
        specialties: true,
        specialtiesList: ['anglic', 'vilani', 'zdetl', 'oynprith'],
        anglic: -3,
        vilani: -3,
        zdetl: -3,
        oynprith: -3,
        trained: false,
    },
    Leadership: { specialties: false, value: -3 },
    Mechanic: { specialties: false, value: -3 },
    Medic: { specialties: false, value: -3 },
    Melee: {
        specialties: true,
        specialtiesList: ['unarmed', 'blade', 'bludgeon', 'natural'],
        unarmed: -3,
        blade: -3,
        bludgeon: -3,
        natural: -3,
        trained: false,
    },
    Navigation: { specialties: false, value: -3 },
    Persuade: { specialties: false, value: -3 },
    Pilot: {
        specialties: true,
        specialtiesList: ['small', 'spacecraft', 'capital'],
        small: -3,
        spacecraft: -3,
        capital: -3,
        trained: false,
    },
    Profession: {
        specialties: true,
        specialtiesList: ['belter', 'biologicals', 'civilEngineering', 'construction', 'hydroponics', 'polymers'],
        belter: -3,
        biologicals: -3,
        civilEngineering: -3,
        construction: -3,
        hydroponics: -3,
        polymers: -3,
        trained: false,
    },
    Recon: { specialties: false, value: -3 },
    Science: {
        specialties: true,
        specialtiesList: ['astronomy', 'biology', 'chemistry', 'physics', 'history', 'psychology'],
        astronomy: -3,
        biology: -3,
        chemistry: -3,
        physics: -3,
        history: -3,
        psychology: -3,
        trained: false,
    },
    Seafarer: {
        specialties: true,
        specialtiesList: ['large', 'personal', 'sail', 'submarine'],
        large: -3,
        personal: -3,
        sail: -3,
        submarine: -3,
        trained: false,
    },
    Stealth: { specialties: false, value: -3 },
    Steward: { specialties: false, value: -3 },
    Streetwise: { specialties: false, value: -3 },
    Survival: { specialties: false, value: -3 },
    Tactics: {
        specialties: true,
        specialtiesList: ['naval', 'military'],
        naval: -3,
        military: -3,
    },
    VaccSuit: { specialties: false, value: -3 },
    specialtySkills: ['Animals', 'Athletics', 'Art', 'Drive', 'Electronics', 'Engineer', 'Flyer', 'Gunner', 'Gun Combat', 'Heavy Weapons', 'Language', 'Melee', 'Pilot', 'Science', 'Seafarer', 'Tactics'],
    trainedSkills: [],
    isTrained: false,
}

const options = {
    name: 'skills',
    initialState: initialSkills,
    reducers: {
        reset: state => initialSkills,
        basicTraining: (state, action) => {
          state.isTrained = true;
            action.payload.forEach((e) => {
                state[e].trained = true;
                if(!state.trainedSkills.includes(e)) {
                    state.trainedSkills.push(e);
                }
                if (state[e].value >= 0) {
                    return;
                }
                if (!state[e].specialties) {
                    state[e].value = 0;
                    return;
                }
                if (state[e].specialtiesList.length > 0) {
                    state[e].specialtiesList.forEach((f) => {
                        state[e][f] = 0;
                    });
                }
                return;
            })
            return state;
        },
        increaseToZero: (state, action) => {
            const skill = action.payload;
            if(!state.trainedSkills.includes(skill)) {
                state.trainedSkills.push(skill);
            }
            if (state[skill]?.value >= 0) {
                return state;
            }
            if (state[skill]?.specialties) {
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
            let val = 1
            if(!state.trainedSkills.includes(skill)) {
                state.trainedSkills.push(skill);
            }
            if (action.payload.value) {
                val = action.payload.value;
            }
            if (state[skill].specialties) {
                if (!state[skill].trained) {
                    state[skill].trained = true;
                    state[skill].specialtiesList.forEach((e) => { state[skill][e] = 0; })
                    state[skill][action.payload.specialty] = val;
                    return state;
                }
                const specialty = action.payload.specialty
                const list = state[skill].specialtiesList;
                if (!list.includes(specialty)) {
                    state[skill].specialtiesList.push(specialty)
                    state[skill][specialty] = val;
                }
                if (state[skill][specialty] > 0) {
                    state[skill][specialty]++
                    return state;
                }
                state[skill][specialty] = val;
                return state;
            }
            if (state[skill].value >= 0) {
                state[skill].value += val
                return state;
            }
            state[skill].value = val;
            return state;
        },
        setValue: (state, action) => {
            const skill = action.payload.skill;
            const value = action.payload.value;
            if(!state.trainedSkills.includes(skill)) {
                state.trainedSkills.push(skill);
            }
            if (state[skill]?.specialties) {
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

export const { reset, basicTraining, increaseToZero, genericIncrease, setValue } = skillsSlice.actions;
export default skillsSlice.reducer;
