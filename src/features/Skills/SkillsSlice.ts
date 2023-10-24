import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface increaseAction {
    skill: keyof AllSkills,
    specialty?: string,
    value?: number
}
interface setAction {
    skill: keyof AllSkills,
    value: number,
    specialty?: string,
}

export type AnySkill = specSkill | noSpecSkill;
export interface noSpecSkill {
    specialties: false,
    value: number
}
export interface specSkill {
    specialties: true,
    specialtiesList: string[],
    specialty: {
        [key: string]: number
    }
    trained: boolean
}
export interface AllSkills {
	Admin: noSpecSkill;
	Advocate: noSpecSkill;
	Animals: specSkill;
	Athletics: specSkill;
	Art: specSkill;
	Astrogation: noSpecSkill;
	Broker: noSpecSkill;
	Carouse: noSpecSkill;
	Diplomat: noSpecSkill;
	Deception: noSpecSkill;
	Drive: specSkill;
	Electronics: specSkill;
	Engineer: specSkill;
	Explosives: noSpecSkill;
	Flyer: specSkill;
	Gambler: noSpecSkill;
	Gunner: specSkill;
	GunCombat: specSkill;
	HeavyWeapons: specSkill;
	Investigate: noSpecSkill;
	JackOfAllTrades: noSpecSkill;
	Language: specSkill;
	Leadership: noSpecSkill;
	Mechanic: noSpecSkill;
	Medic: noSpecSkill;
	Melee: specSkill;
	Navigation: noSpecSkill;
	Persuade: noSpecSkill;
	Pilot: specSkill;
	Profession: specSkill;
	Recon: noSpecSkill;
	Science: specSkill;
	Seafarer: specSkill;
	Stealth: noSpecSkill;
	Steward: noSpecSkill;
	Streetwise: noSpecSkill;
	Survival: noSpecSkill;
	Tactics: specSkill;
	VaccSuit: noSpecSkill;
}
export type skillState =  AllSkills & {
    specialtySkills: string[],
    trainedSkills: string[]
    isTrained: boolean
}
export const initialSkills: skillState = {
	Admin: { specialties: false, value: -3 },
	Advocate: { specialties: false, value: -3 },
	Animals: {
		specialties: true,
		specialtiesList: ["handling", "training", "veterinary"],
		specialty: {
			handling: -3,
			training: -3,
			veterinary: -3,
		},
		trained: false,
	},
	Athletics: {
		specialties: true,
		specialtiesList: ["dexterity", "endurance", "strength"],
		specialty: {
			dexterity: -3,
			endurance: -3,
			strength: -3,
		},
		trained: false,
	},
	Art: {
		specialties: true,
		specialtiesList: [
			"performer",
			"holography",
			"instrument",
			"visual",
			"write",
		],
		specialty: {
			performer: -3,
			holography: -3,
			instrument: -3,
			visual: -3,
			write: -3,
		},
		trained: false,
	},
	Astrogation: { specialties: false, value: -3 },
	Broker: { specialties: false, value: -3 },
	Carouse: { specialties: false, value: -3 },
	Diplomat: { specialties: false, value: -3 },
	Deception: { specialties: false, value: -3 },
	Drive: {
		specialties: true,
		specialtiesList: ["hovercraft", "mole", "track", "walker", "wheel"],
		specialty: {
			hovercraft: -3,
			mole: -3,
			track: -3,
			walker: -3,
			wheel: -3,
		},
		trained: false,
	},
	Electronics: {
		specialties: true,
		specialtiesList: ["comms", "computers", "remoteOps", "sensors"],
		specialty: {
			comms: -3,
			computers: -3,
			remoteOps: -3,
			sensors: -3,
		},
		trained: false,
	},
	Engineer: {
		specialties: true,
		specialtiesList: ["mDrive", "jDrive", "lifeSupport", "power"],
		specialty: {
			mDrive: -3,
			jDrive: -3,
			lifeSupport: -3,
			power: -3,
		},
		trained: false,
	},
	Explosives: { specialties: false, value: -3 },
	Flyer: {
		specialties: true,
		specialtiesList: ["airship", "grav", "ornithopter", "rotor", "wing"],
		specialty: {
			airship: -3,
			grav: -3,
			ornithopter: -3,
			rotor: -3,
			wing: -3,
		},
		trained: false,
	},
	Gambler: { specialties: false, value: -3 },
	Gunner: {
		specialties: true,
		specialtiesList: ["turret", "ortillery", "screens", "capital"],
		specialty: {
			turret: -3,
			ortillery: -3,
			screens: -3,
			capital: -3,
		},
		trained: false,
	},
	GunCombat: {
		specialties: true,
		specialtiesList: ["archaic", "energy", "slug"],
		specialty: {
			archaic: -3,
			energy: -3,
			slug: -3,
		},
		trained: false,
	},
	HeavyWeapons: {
		specialties: true,
		specialtiesList: ["artillery", "manPortable", "vehicle"],
		specialty: {
			artillery: -3,
			manPortable: -3,
			vehicle: -3,
		},
		trained: false,
	},
	Investigate: { specialties: false, value: -3 },
	JackOfAllTrades: { specialties: false, value: -3 },
	Language: {
		specialties: true,
		specialtiesList: ["anglic", "vilani", "zdetl", "oynprith"],
		specialty: {
			anglic: -3,
			vilani: -3,
			zdetl: -3,
			oynprith: -3,
		},
		trained: false,
	},
	Leadership: { specialties: false, value: -3 },
	Mechanic: { specialties: false, value: -3 },
	Medic: { specialties: false, value: -3 },
	Melee: {
		specialties: true,
		specialtiesList: ["unarmed", "blade", "bludgeon", "natural"],
		specialty: {
			unarmed: -3,
			blade: -3,
			bludgeon: -3,
			natural: -3,
		},
		trained: false,
	},
	Navigation: { specialties: false, value: -3 },
	Persuade: { specialties: false, value: -3 },
	Pilot: {
		specialties: true,
		specialtiesList: ["small", "spacecraft", "capital"],
		specialty: {
			small: -3,
			spacecraft: -3,
			capital: -3,
		},
		trained: false,
	},
	Profession: {
		specialties: true,
		specialtiesList: [
			"belter",
			"biologicals",
			"civilEngineering",
			"construction",
			"hydroponics",
			"polymers",
		],
		specialty: {
			belter: -3,
			biologicals: -3,
			civilEngineering: -3,
			construction: -3,
			hydroponics: -3,
			polymers: -3,
		},
		trained: false,
	},
	Recon: { specialties: false, value: -3 },
	Science: {
		specialties: true,
		specialtiesList: [
			"astronomy",
			"biology",
			"chemistry",
			"physics",
			"history",
			"psychology",
		],
		specialty: {
			astronomy: -3,
			biology: -3,
			chemistry: -3,
			physics: -3,
			history: -3,
			psychology: -3,
		},
		trained: false,
	},
	Seafarer: {
		specialties: true,
		specialtiesList: ["large", "personal", "sail", "submarine"],
		specialty: {
			large: -3,
			personal: -3,
			sail: -3,
			submarine: -3,
		},
		trained: false,
	},
	Stealth: { specialties: false, value: -3 },
	Steward: { specialties: false, value: -3 },
	Streetwise: { specialties: false, value: -3 },
	Survival: { specialties: false, value: -3 },
	Tactics: {
		specialties: true,
		specialtiesList: ["naval", "military"],
		specialty: {
            naval: -3,
            military: -3,
        },
		trained: false,
	},
	VaccSuit: { specialties: false, value: -3 },
	specialtySkills: [
		"Animals",
		"Athletics",
		"Art",
		"Drive",
		"Electronics",
		"Engineer",
		"Flyer",
		"Gunner",
		"Gun Combat",
		"Heavy Weapons",
		"Language",
		"Melee",
		"Pilot",
		"Science",
		"Seafarer",
		"Tactics",
	],
	trainedSkills: [],
	isTrained: false,
};

//TODO: Swapping payload expectation to be "string" instead of keyof AllSkills - and then doing a type safety check in the reducer and cancelling the action if it doesn't match any of the keys of the state!

export type AnySkillPayload = keyof AllSkills[] | string | increaseAction | setAction;

const skillsSlice = createSlice({
	name: "skills",
	initialState: initialSkills,
	reducers: {
		reset: (state: skillState) => initialSkills,
		basicTraining: (state: skillState, action:  PayloadAction<(keyof AllSkills)[]>) => {
			state.isTrained = true;
			action.payload.forEach((e) => {
                if (!state.trainedSkills.includes(e)) {
                    state.trainedSkills.push(e);
				}
                const currSkill = state[e]
				if (!currSkill.specialties) {
                    if (currSkill.value >= 0) {
                        return;
                    }
                    currSkill.value = 0;
					return;
				}
				if (currSkill.specialtiesList.length > 0) {
					currSkill.specialtiesList.forEach((f) => {
						currSkill.specialty[f] = 0;
					});
				}
				return;
			});
			return state;
		},
		increaseToZero: (state: skillState, action: PayloadAction<string>) => {
            const skillName = action.payload
			const skill = state[action.payload as keyof AllSkills];
			if (!state.trainedSkills.includes(skillName)) {
				state.trainedSkills.push(skillName);
			}
            if (!skill.specialties && skill.value >= 0) {
                return state;
            } 
			if (skill.specialties) {
				if (skill.specialtiesList.length > 0) {
					skill.specialtiesList.forEach((e) => {
						skill.specialty[e] = 0;
					});
				}
				skill.trained = true;
				return state;
			}
			skill.value = 0;

			return state;
		},
		genericIncrease: (state: skillState, action: PayloadAction<increaseAction>) => {
			const skillName = action.payload.skill;
            const skill = state[skillName];
			let val = 1;
			if (!state.trainedSkills.includes(skillName)) {
				state.trainedSkills.push(skillName);
			}
			if (action.payload.value) {
				val = action.payload.value;
			}
			if (skill.specialties) {
                const specialty = action.payload?.specialty
                if (!specialty) {
                    console.warn(
                        "No Valid Specialty passed to Generic Increase in Skill Slice! Action Aborted"
                    );
                    return;
                }
				if (!skill.trained) {
					skill.trained = true;
					skill.specialtiesList.forEach((e) => {
						skill.specialty[e] = 0;
					});
					skill.specialty[specialty] = val;
					return state;
				}

				const list = skill.specialtiesList;
				if (!list.includes(specialty)) {
					skill.specialtiesList.push(specialty);
					skill.specialty[specialty] = val;
				}
				if (skill.specialty[specialty] > 0) {
					skill.specialty[specialty]++;
					return state;
				}
				skill.specialty[specialty] = val;
				return state;
			}
			if (skill.value >= 0) {
				skill.value += val;
				return state;
			}
			skill.value = val;
			return state;
		},
		setValue: (state: skillState, action: PayloadAction<setAction>) => {
			const skillName = action.payload.skill;
            const skill = state[skillName]
			const value = action.payload.value;
			if (!state.trainedSkills.includes(skillName)) {
				state.trainedSkills.push(skillName);
			}
			if (skill?.specialties) {
				skill.trained = true;
				const list = skill.specialtiesList;
				const specialty = action.payload?.specialty;
                if (!specialty) {
                    console.warn("No valid specialty passed to setValue! Aborting Action!")
                    return;
                }
				if (!list.includes(specialty)) {
					skill.specialtiesList.push(specialty);
					skill.specialty[specialty] = value;
				}
				if (skill.specialty[specialty] >= 0) {
					if (skill.specialty[specialty] >= value) {
						return state;
					}
				}
				skill.specialty[specialty] = value;
				return state;
			}
			if (skill.value >= value) {
				return state;
			}
			skill.value = value;
			return state;
		},
	},
});

export const { reset, basicTraining, increaseToZero, genericIncrease, setValue } = skillsSlice.actions;
export default skillsSlice.reducer;
