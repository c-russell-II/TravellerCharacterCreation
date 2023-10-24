import { CareerSpecialty, ParentCareer } from "../CareerTyping";

export const scout: ParentCareer = {
	title: "Scouts",
	description:
		"Members of the exploratory service. Scouts explore new areas, map and survey known or newly discovered areas, and maintain communication ships which carry information and messages between the worlds of the galaxy.",
	qualification: true,
	qualificationStat: "int",
	qualificationDC: 5,
	eventList: {
		2: {
			type: "redirect",
			destination: "mishap",
			description: "Disaster!",
			noMuster: true,
		},
		3: {
			type: "check",
			checkType: "choice",
			choiceList: ["Pilot", "Persuade"],
			specialtyList: { Pilot: "any", Persuade: null },
			description: "Your ship is ambushed by enemy vessels.",
			checkDC: 8,
			pass: {
				type: "reward",
				description:
					"Either through parley or just cheesing it, you get away unscathed.",
				result: {
					type: "multiple",
					list: ["skill", "enemy"],
					details: {
						skill: {
							type: "setSkill",
							skill: "Electronics",
							specialty: "sensors",
							value: 1,
						},
						enemy: {
							type: "enemy",
							value: 1,
							description:
								"An enemy who ambushed you, you either talked or flew your way out, while working as a Scout.",
						},
					}
				},
			},
			fail: {
				type: "reward",
				description:
					"You fail to talk or fly your way out, and your ship is destroyed.",
				result: {
					type: "multiple",
					list: ["muster", "enemy"],
					details: {
						muster: { type: "special", specialType: "muster" },
						enemy: {
							type: "enemy",
							value: 1,
							description:
								"An enemy who ambushed you, and you failed to escape from, while working as a Scout.",
						},
					}
				},
			},
		},
		4: {
			type: "reward",
			description: "You survey an alien world.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: ["Animals", "Survival", "Recon", "Science"],
				specialtyList: {
					Animals: ["riding", "training"],
					Survival: null,
					Recon: null,
					Science: "any",
				},
				value: 1,
			},
		},
		5: {
			type: "reward",
			description: "You perform an exemplary service for the scouts.",
			result: { type: "benefit", value: 1 },
		},
		6: {
			type: "reward",
			description:
				"You spend several years jumping from world to world in your scout ship.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: [
					"Astrogation",
					"Electronics",
					"Navigation",
					"Pilot",
					"Mechanic",
				],
				specialtyList: {
					Astrogation: null,
					Electronics: "any",
					Navigation: null,
					Pilot: "small",
					Mechanic: null,
				},
				value: 1,
			},
		},
		7: { type: "redirect", destination: "life" },
		8: {
			type: "check",
			checkType: "choice",
			choiceList: ["Electronics", "Deception"],
			specialtyList: { Electronics: "any", Deception: null },
			checkDC: 8,
			description:
				"When dealing with an alien race, you have an opportunity to gather more useful information on them.",
			pass: {
				description:
					"Using wiles of personal or electronic variety, you gather the information, leaving them none the wiser.",
				type: 'reward',
				result: {
					type: "multiple",
					list: ["ally", "advancement"],
					details: {
						ally: {
							type: "ally",
							value: 1,
							description:
								"Someone in the Imperium who is very happy about information you - quietly- gathered on an alien race.",
						},
						advancement: { type: "advancement", value: 2 },
					}
				},
			},
			fail: {
				description:
					"You fail to gather the information, either due to being caught or to being too cautious.",
				type: 'redirect',
				destination: 'mishap',
				noMuster: true
			},
		},
		9: {
			type: "check",
			checkType: "choice",
			choiceList: ["Medic", "Engineer"],
			specialtyList: { Medic: null, Engineer: "any" },
			checkDC: 8,
			description:
				"Your scout ship is one of the first on the scene to rescue the survivors of the disaster.",
			pass: {
				type: "reward",
				description:
					"Your aid is instrumental in rescuing as many survivors as possible.",
				result: {
					type: "multiple",
					list: ["advancement", "contact"],
					details: {
						advancement: { type: "advancement", value: 2 },
						contact: {
							type: "contact",
							value: 1,
							description:
								"Someone you helped save from a disaster as a Scout- or someone you worked with to deal with that disaster.",
						},
					}
				},
			},
			fail: {
				type: "reward",
				description:
					"Despite your best efforts, you make little difference to the ultimate fate of the survivors.",
				result: {
					type: "enemy",
					value: 1,
					description:
						"Someone who is upset at your failure to aid more survivors in a disaster you came across as a Scout.",
				},
			},
		},
		10: {
			type: "check",
			checkType: "choice",
			choiceList: ["Survival", "Pilot"],
			specialtyList: { Survival: null, Pilot: "any" },
			checkDC: 8,
			description:
				"You spend a great deal of time on the fringes of Charted Space.",
			pass: {
				type: "reward",
				description: "You make contact with an alien race!",
				result: {
					type: "multiple",
					list: ["contact", "skill"],
					details: {
						contact: {
							type: "contact",
							value: 1,
							description:
								"An alien you met after quite a while on the fringes of Charted Space.",
						},
						skill: { type: "choice", choiceType: "increaseAny" },
					}
				},
			},
			fail: {
				description:
					"You don't hold up so well to the wild space you found yourself in.",
				type: "redirect",
				destination: "mishap",
				noMuster: true,
			},
		},
		11: {
			type: "reward",
			description:
				"You serve as the courier for an important message from the imperium.",
			result: {
				type: "choice",
				choiceType: "multiple",
				choiceList: ["Diplomat", "advancement"],
				choiceDetails: {
					Diplomat: {
						type: "increaseSkill",
						skill: "Diplomat",
						value: 1,
						button: "Increase Diplomat",
					},
					advancement: {
						type: "advancement",
						value: 4,
						button: "Advancement + 4",
					},
				}
			},
		},
		12: {
			type: "reward",
			description:
				"You discover a world, item, or information important to the Imperium.",
			result: { type: "promotion" },
		},
	},
	mishapList: [
		{
			type: "redirect",
			destination: "injury table",
			modifier: "disadvantage",
		},
		{
			type: "reward",
			description: "Psychologically damaged by your time in the scouts.",
			result: {
				type: "choice",
				choiceType: "stat",
				choiceList: ["int", "soc"],
				value: -1,
			},
		},
		{
			type: "reward",
			description:
				"Your ship is damaged, and you have to hitch-hike your way back across the stars to the nearest scout base.",
			result: {
				type: "multiple",
				list: ["contacts", "enemies"],
				details: {
					contacts: {
						type: "contact",
						value: "roll",
						roll: 5,
						description:
							"People you got to know while hitchhiking back to a Scout base during your time in that career.",
					},
					enemies: {
						type: "enemy",
						value: "roll",
						roll: 2,
						description:
							"People you disliked, who disliked you in turn, met while hitchhiking back to a Scout base during your time in that career.",
					},
				}
			},
		},
		{
			type: "reward",
			description:
				"You inadvertently cause a conflict between the Imperium and a minor world or race.",
			result: {
				type: "multiple",
				list: ["rival", "skill"],
				details: {
					rival: {
						type: "rival",
						value: 1,
						description:
							"Someone who came to dislike you after you started a conflict between the Imperium and a minor faction, while working as a Scout",
					},
					skill: { type: "setSkill", value: 1, skill: "Diplomat" },
				}
			},
		},
		{
			type: "generic",
			description:
				"You have no idea what happened to you. You were found drifting on the fringes of friendly space.",
		},
		{ type: "redirect", destination: "injury table" },
	],
	skills: {
		personal: [
			{ type: "stat", stat: "str" },
			{ type: "stat", stat: "dex" },
			{ type: "stat", stat: "end" },
			{ type: "stat", stat: "int" },
			{ type: "stat", stat: "edu" },
			{ type: "skill", skill: "JackOfAllTrades" },
		],
		service: [
			{
				type: "skill",
				skill: "Pilot",
				specialty: ["small", "spacecraft"],
			},
			{ type: "skill", skill: "Survival" },
			{ type: "skill", skill: "Mechanic" },
			{ type: "skill", skill: "Astrogation" },
			{ type: "skill", skill: "VaccSuit" },
			{ type: "skill", skill: "GunCombat" },
		],
		advanced: [
			{ type: "skill", skill: "Medic" },
			{ type: "skill", skill: "Navigation" },
			{ type: "skill", skill: "Seafarer" },
			{ type: "skill", skill: "Explosives" },
			{ type: "skill", skill: "Science" },
			{ type: "skill", skill: "JackOfAllTrades" },
		],
		specialties: {
			courier: [
				{ type: "skill", skill: "Electronics" },
				{ type: "skill", skill: "Flyer" },
				{ type: "skill", skill: "Pilot", specialty: "spacecraft" },
				{ type: "skill", skill: "Engineer" },
				{ type: "skill", skill: "Athletics" },
				{ type: "skill", skill: "Astrogation" },
			],
			surveyor: [
				{ type: "skill", skill: "Electronics" },
				{ type: "skill", skill: "Persuade" },
				{ type: "skill", skill: "Pilot" },
				{ type: "skill", skill: "Navigation" },
				{ type: "skill", skill: "Diplomat" },
				{ type: "skill", skill: "Streetwise" },
			],
			explorer: [
				{ type: "skill", skill: "Electronics" },
				{ type: "skill", skill: "Pilot" },
				{ type: "skill", skill: "Engineer" },
				{ type: "skill", skill: "Science" },
				{ type: "skill", skill: "Stealth" },
				{ type: "skill", skill: "Recon" },
			],
		},
	},
	benefits: [
		{ money: 20000, misc: "ShipShare", miscValue: 1 },
		{ money: 20000, misc: "int", miscValue: 1 },
		{ money: 30000, misc: "edu", miscValue: 1 },
		{ money: 30000, misc: "Weapon" },
		{ money: 50000, misc: "Weapon" },
		{ money: 50000, misc: "Scout Ship" },
		{ money: 50000, misc: "Scout Ship" },
	],
	specialtiesList: ["courier", "surveyor", "explorer"],
};

export const courier: CareerSpecialty = {
	title: "Courier",
	description:
		"You are responsible for shuttling messages and high value packages around the galaxy.",
	survivalSkill: "end",
	survivalDC: 5,
	advancementSkill: "edu",
	advancementDC: 9,
	eventList: scout.eventList,
	mishapList: scout.mishapList,
	ranks: [
		{ title: "Junior Scout", bonus: false },
		{
			title: "Scout",
			bonus: { type: "skill", skill: "VaccSuit", value: 1 },
		},
		{ title: "Journeyman Scout", bonus: false },
		{
			title: "Senior Scout",
			bonus: {
				type: "skill",
				skill: "Pilot",
				specialty: "any",
				value: 1,
			},
		},
		{ title: "Seasoned Scout", bonus: false },
		{ title: "Veteran Scout", bonus: false },
		{ title: "Shellback", bonus: false },
	],
	skills: scout.skills,
	benefits: scout.benefits,
	parent: "scout",
};
export const surveyor: CareerSpecialty = {
	title: "Surveyor",
	description: "You visit border worlds and assess their worth.",
	survivalSkill: "end",
	survivalDC: 6,
	advancementSkill: "int",
	advancementDC: 9,
	eventList: scout.eventList,
	mishapList: scout.mishapList,
	ranks: [
		{ title: "Junior Scout", bonus: false },
		{
			title: "Scout",
			bonus: { type: "skill", skill: "VaccSuit", value: 1 },
		},
		{ title: "Journeyman Scout", bonus: false },
		{
			title: "Senior Scout",
			bonus: {
				type: "skill",
				skill: "Pilot",
				specialty: "any",
				value: 1,
			},
		},
		{ title: "Seasoned Scout", bonus: false },
		{ title: "Veteran Scout", bonus: false },
		{ title: "Shellback", bonus: false },
	],
	skills: scout.skills,
	benefits: scout.benefits,
	parent: "scout",
};
export const explorer: CareerSpecialty = {
	title: "Explorer",
	description:
		"You go wherever the map is blank, exploring unknown worlds and uncharted space.",
	survivalSkill: "end",
	survivalDC: 7,
	advancementSkill: "edu",
	advancementDC: 7,
	eventList: scout.eventList,
	mishapList: scout.mishapList,
	ranks: [
		{ title: "Junior Scout", bonus: false },
		{
			title: "Scout",
			bonus: { type: "skill", skill: "VaccSuit", value: 1 },
		},
		{ title: "Journeyman Scout", bonus: false },
		{
			title: "Senior Scout",
			bonus: {
				type: "skill",
				skill: "Pilot",
				specialty: "any",
				value: 1,
			},
		},
		{ title: "Seasoned Scout", bonus: false },
		{ title: "Veteran Scout", bonus: false },
		{ title: "Shellback", bonus: false },
	],
	skills: scout.skills,
	benefits: scout.benefits,
	parent: "scout",
};
