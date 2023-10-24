import { CareerSpecialty, ParentCareer } from "../CareerTyping";

export const navy: ParentCareer = {
	hasCommission: true,
	title: "Navy",
	description:
		"Members of the interstellar navy which patrols space between the stars. The navy has the responsibility for the protection of society from foreign powers and lawless elements in the interstellar trade channels.",
	qualification: true,
	qualificationAge: 34,
	qualificationStat: "int",
	qualificationDC: 6,
	eventList: {
		2: {
			type: "redirect",
			destination: "mishap",
			description: "Disaster!",
			noMuster: true,
		},
		3: { type: "special", specialType: "gamble" },
		4: {
			type: "reward",
			description: "You are given a special assignment or duty on board.",
			result: { type: "benefit", value: 1 },
		},
		5: {
			type: "check",
			checkType: "stat",
			checkStat: "edu",
			checkDC: 8,
			description:
				"You are offered an opportunity for advanced, specialist training.",
			pass: {
				type: "reward",
				description:
					"Taking full advantage, your skills noticeably increase.",
				result: { type: "choice", choiceType: "increaseAny" },
			},
			fail: {
				type: "generic",
				description:
					"You do not manage to measure up to your instructors' standards.",
			},
		},
		6: {
			type: "reward",
			description:
				"Your vessel participates in a notable military engagement, from which you learn quite a bit.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: ["Electronics", "Engineer", "Gunner", "Pilot"],
				specialtyList: {
					Electronics: "any",
					Engineer: "any",
					Gunner: "any",
					Pilot: "any",
				},
				value: 1,
			},
		},
		7: { type: "redirect", destination: "life" },
		8: {
			type: "reward",
			description:
				"Your vessel participates in a diplomatic mission, teaching you new, more diplomatic skills.",
			result: {
				type: "choice",
				choiceType: "multiple",
				choiceList: ["Recon", "Diplomat", "Steward", "contact"],
				choiceDetails: {
					Recon: {
						type: "setSkill",
						skill: "Recon",
						specialty: null,
						value: 1,
						button: "Recon 1",
					},
					Diplomat: {
						type: "setSkill",
						skill: "Diplomat",
						specialty: null,
						value: 1,
						button: "Diplomat 1",
					},
					Steward: {
						type: "setSkill",
						skill: "Steward",
						specialty: null,
						value: 1,
						button: "Steward 1",
					},
					contact: {
						type: "contact",
						value: 1,
						description:
							"Someone you met while on a diplomatic mission for the Navy.",
						button: "New Contact",
					},
				},
			},
		},
		9: {
			type: "reward",
			description: "You foil an attempted mutiny on board.",
			result: {
				type: "multiple",
				list: ["advancement", "enemy"],
				details: {
					enemy: {
						type: "enemy",
						description:
							"Someone whose mutiny you foiled while in the Navy",
					},
					advancement: { type: "advancement", value: 2 },
				},
			},
		},
		10: {
			type: "choice",
			description:
				"You have the opportunity to abuse your position for profit.",
			choiceList: ["a", "b"],
			choice: {
				a: {
					type: "reward",
					description:
						"You make some money on the side, and no one is hurt by it- or ever finds out.",
					result: { type: "addBenefit", value: 1 },
				},
				b: {
					type: "reward",
					description:
						"You refuse, and point out the possibility to someone in a position to fix the problem.",
					result: { type: "advancement", value: 2 },
				},
			},
		},
		11: {
			type: "reward",
			description:
				"Your commanding officer takes an active interest in your career.",
			result: {
				type: "choice",
				choiceType: "multiple",
				choiceList: ["Tactics", "advancement"],
				choiceDetails: {
					Tactics: {
						type: "setSkill",
						skill: "Tactics",
						specialty: "naval",
						value: 1,
						button: "Tactics(naval) 1",
					},
					advancement: {
						type: "advancement",
						value: 4,
						button: "Advancement + 4",
					},
				},
			},
		},
		12: {
			type: "reward",
			description: "Your heroism in battle saves your entire vessel.",
			result: { type: "promotion" },
		},
	},
	mishapList: [
		{
			type: "redirect",
			destination: "injury",
			modifier: "disadvantage",
			description: "You are severely injured...",
		},
		{
			type: "reward",
			description: "You were woken from cryosleep improperly.",
			//TODO: FIX NOMUSTER IN NAVY MISHAP!
			// noMuster: true,
			result: {
				type: "choice",
				choiceType: "stat",
				choiceList: ["str", "dex", "end"],
				value: -1,
			},
		},
		{ type: "special", specialType: "branchSkillCheck" },
		{
			type: "choice",
			description:
				"You were blamed for an accident that causes the deaths of several of your crewmates.",
			choiceList: ["a", "b"],
			choice: {
				//TODO: SPECIAL TYPE TABLE In navy mishap
				a: {
					button: "It was you...",
					type: "special",
					specialType: "table",
				},
				b: {
					button: "It wasn't!",
					type: "reward",
					description:
						"You manage to (partially) clear your name, but are still quietly ejected as part of the official whitewash.",
					result: {
						type: "multiple",
						list: ["enemy", "addBenefit"],
						details: {
							addBenefit: { type: "addBenefit", value: 1 },
							enemy: {
								type: "enemy",
								value: 1,
								description:
									"An officer who blamed you for an accident, and who lost their career when you proved their accusation false.",
							},
						},
					},
				},
			},
		},
		{
			type: "reward",
			description:
				"You are tormented by or quarrel with an officer or fellow crewman. They drives you out of the serivce.",
			result: {
				type: "rival",
				value: 1,
				description: "Drove you out of navy career",
			},
		},
		{ type: "redirect", destination: "injury" },
	],
	skills: {
		personal: [
			{ type: "stat", stat: "str" },
			{ type: "stat", stat: "dex" },
			{ type: "stat", stat: "end" },
			{ type: "stat", stat: "int" },
			{ type: "stat", stat: "edu" },
			{ type: "stat", stat: "soc" },
		],
		service: [
			{ type: "skill", skill: "Pilot", specialty: {Pilot: "any"} },
			{ type: "skill", skill: "VaccSuit", specialty: {VaccSuit: null} },
			{ type: "skill", skill: "Athletics", specialty: {Athletics: "any"} },
			{ type: "skill", skill: "Gunner", specialty: {Gunner: "any"} },
			{ type: "skill", skill: "Mechanic", specialty: {Mechanic: null} },
			{ type: "skill", skill: "GunCombat", specialty: {GunCombat: "any"} },
		],
		advanced: [
			{ type: "skill", skill: "Electronics", specialty: {Electronics: "any"} },
			{ type: "skill", skill: "Astrogation", specialty: {Astrogation: null} },
			{ type: "skill", skill: "Engineer", specialty: {Engineer: "any"} },
			{ type: "skill", skill: "Drive", specialty: {Drive: "any"} },
			{ type: "skill", skill: "Navigation", specialty: {Navigation: null} },
			{ type: "skill", skill: "Admin", specialty: {Admin: null} },
		],
		officer: [
			{ type: "skill", skill: "Leadership", specialty: {Leadership: null} },
			{ type: "skill", skill: "Electronics", specialty: {Electronics: "any"} },
			{ type: "skill", skill: "Pilot", specialty: {Pilot: "any"} },
			{ type: "skill", skill: "Melee", specialty: {Melee: "blade"} },
			{ type: "skill", skill: "Admin", specialty: {Admin: null} },
			{ type: "skill", skill: "Tactics", specialty: {Tactics: "naval"} },
		],
		specialties: {
			lineCrew: [
				{ type: "skill", skill: "Electronics", specialty: {Electronics: "any"} },
				{ type: "skill", skill: "Mechanic", specialty: {Mechanic: null} },
				{ type: "skill", skill: "GunCombat", specialty: {GunCombat: "any"} },
				{ type: "skill", skill: "Flyer", specialty: {Flyer: "any"} },
				{ type: "skill", skill: "Melee", specialty: {Melee: "any"} },
				{ type: "skill", skill: "VaccSuit", specialty: {VaccSuit: null} },
			],
			engineerGunner: [
				{ type: "skill", skill: "Engineer", specialty: {Engineer: "any"} },
				{ type: "skill", skill: "Mechanic", specialty: {Mechanic: null} },
				{ type: "skill", skill: "Electronics", specialty: {Electronics: "any"} },
				{ type: "skill", skill: "Engineer", specialty: {Engineer: "any"} },
				{ type: "skill", skill: "Gunner", specialty: {Gunner: "any"} },
				{ type: "skill", skill: "Flyer", specialty: {Flyer: "any"} },
			],
			flight: [
				{ type: "skill", skill: "Pilot", specialty: {Pilot: "any"} },
				{ type: "skill", skill: "Flyer", specialty: {Flyer: "any"} },
				{ type: "skill", skill: "Gunner", specialty: {Gunner: "any"} },
				{ type: "skill", skill: "Pilot", specialty: {Pilot: "small"} },
				{ type: "skill", skill: "Astrogation", specialty: {Astrogation: null} },
				{ type: "skill", skill: "Electronics", specialty: {Electronics: "any"} },
			],
		},
	},
	benefits: [
		{
			money: 1000,
			misc: "choice",
			miscList: ["Personal Vehicle", "ShipShare"],
			miscValue: 1,
		},
		{ money: 5000, misc: "int", miscValue: 1 },
		{
			money: 5000,
			misc: "choice",
			miscList: ["edu", "ShipShare"],
			//TODO: AAAAAAAAAAAAAA THERE IS A DIFFERENCE In value between these two choices :)
			miscValues: {
				edu: { type: "stat", stat: "edu" },
				ShipShare: { type: "misc", misc: "ShipShare", value: 2 },
			},
		},
		{ money: 10000, misc: "Weapon" },
		{ money: 20000, misc: "TAS" },
		{
			money: 50000,
			misc: "choice",
			miscList: ["Ships Boat", "ShipShare"],
			miscValue: 2,
		},
		{ money: 50000, misc: "soc", miscValue: 2 },
	],
	specialtiesList: ["lineCrew", "engineerGunner", "flight"],
};

export const lineCrew: CareerSpecialty = {
	title: "Line/Crew",
	description:
		"You serve as a general crewman or officer on a ship of the line",
	survivalSkill: "int",
	survivalDC: 5,
	advancementSkill: "edu",
	advancementDC: 7,
	eventList: navy.eventList,
	mishapList: navy.mishapList,
	ranks: [
		{ title: "Crewman", bonus: false },
		{
			title: "Able Spacehand",
			bonus: { type: "skill", skill: "Mechanic", specialty: {Mechanic: null}, value: 1 },
		},
		{
			title: "Petty Officer Third Class",
			bonus: { type: "skill", skill: "VaccSuit", specialty: {VaccSuit: null}, value: 1 },
		},
		{ title: "Petty Officer Second Class", bonus: false },
		{
			title: "Petty Officer First Class",
			bonus: { type: "stat", stat: "end", value: 1 },
		},
		{ title: "Chief Petty Officer", bonus: false },
		{ title: "Master Chief Petty Officer", bonus: false },
	],
	comRanks: [
		{
			title: "Ensign",
			bonus: {
				type: "skill",
				skill: "Melee",
				specialty: {Melee: "blade"},
				value: 1,
			},
		},
		{
			title: "Sublieutenant",
			bonus: { type: "skill", skill: "Leadership", specialty: {Leadership: null}, value: 1 },
		},
		{ title: "Lieutenant", bonus: false },
		{
			title: "Commander",
			bonus: {
				type: "skill",
				skill: "Tactics",
				specialty: {Tactics: "naval"},
				value: 1,
			},
		},
		{
			title: "Captain",
			bonus: { type: "setStat", stat: "soc", threshold: 10, value: 1 },
		},
		{
			title: "Admiral",
			bonus: { type: "setStat", stat: "soc", threshold: 12, value: 1 },
		},
	],
	skills: navy.skills,
	benefits: navy.benefits,
	parent: "navy",
};
export const engineerGunner: CareerSpecialty = {
	title: "Engineer/Gunner",
	description: "You serve as a specialist technician on a starship.",
	survivalSkill: "int",
	survivalDC: 6,
	advancementSkill: "edu",
	advancementDC: 6,
	eventList: navy.eventList,
	mishapList: navy.mishapList,
	ranks: [
		{ title: "Crewman", bonus: false },
		{
			title: "Able Spacehand",
			bonus: { type: "skill", skill: "Mechanic", specialty: {Mechanic: null}, value: 1 },
		},
		{
			title: "Petty Officer Third Class",
			bonus: { type: "skill", skill: "VaccSuit", specialty: {VaccSuit: null}, value: 1 },
		},
		{ title: "Petty Officer Second Class", bonus: false },
		{
			title: "Petty Officer First Class",
			bonus: { type: "stat", stat: "end", value: 1 },
		},
		{ title: "Chief Petty Officer", bonus: false },
		{ title: "Master Chief Petty Officer", bonus: false },
	],
	comRanks: [
		{
			title: "Ensign",
			bonus: {
				type: "skill",
				skill: "Melee",
				specialty: {Melee: "blade"},
				value: 1,
			},
		},
		{
			title: "Sublieutenant",
			bonus: { type: "skill", skill: "Leadership", specialty: {Leadership: null}, value: 1 },
		},
		{ title: "Lieutenant", bonus: false },
		{
			title: "Commander",
			bonus: {
				type: "skill",
				skill: "Tactics",
				specialty: {Tactics: "naval"},
				value: 1,
			},
		},
		{
			title: "Captain",
			bonus: { type: "setStat", stat: "soc", threshold: 10, value: 1 },
		},
		{
			title: "Admiral",
			bonus: { type: "setStat", stat: "soc", threshold: 12, value: 1 },
		},
	],
	skills: navy.skills,
	benefits: navy.benefits,
	parent: "navy",
};
export const flight: CareerSpecialty = {
	title: "Flight",
	description: "You are a pilot of a shuttle, fighter, or other light craft.",
	survivalSkill: "dex",
	survivalDC: 7,
	advancementSkill: "edu",
	advancementDC: 5,
	eventList: navy.eventList,
	mishapList: navy.mishapList,
	ranks: [
		{ title: "Crewman", bonus: false },
		{
			title: "Able Spacehand",
			bonus: { type: "skill", skill: "Mechanic", specialty: {Mechanic: null}, value: 1 },
		},
		{
			title: "Petty Officer Third Class",
			bonus: { type: "skill", skill: "VaccSuit", specialty: {VaccSuit: null}, value: 1 },
		},
		{ title: "Petty Officer Second Class", bonus: false },
		{
			title: "Petty Officer First Class",
			bonus: { type: "stat", stat: "end", value: 1 },
		},
		{ title: "Chief Petty Officer", bonus: false },
		{ title: "Master Chief Petty Officer", bonus: false },
	],
	comRanks: [
		{
			title: "Ensign",
			bonus: {
				type: "skill",
				skill: "Melee",
				specialty: {Melee: "blade"},
				value: 1,
			},
		},
		{
			title: "Sublieutenant",
			bonus: { type: "skill", skill: "Leadership", specialty: {Leadership: null}, value: 1 },
		},
		{ title: "Lieutenant", bonus: false },
		{
			title: "Commander",
			bonus: {
				type: "skill",
				skill: "Tactics",
				specialty: {Tactics: "naval"},
				value: 1,
			},
		},
		{
			title: "Captain",
			bonus: { type: "setStat", stat: "soc", threshold: 10, value: 1 },
		},
		{
			title: "Admiral",
			bonus: { type: "setStat", stat: "soc", threshold: 12, value: 1 },
		},
	],
	skills: navy.skills,
	benefits: navy.benefits,
	parent: "navy",
};
