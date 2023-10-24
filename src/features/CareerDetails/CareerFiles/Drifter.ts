import { CareerSpecialty, ParentCareer } from "../CareerTyping";

export const drifter: ParentCareer = {
	title: "Drifter",
	description:
		"Wanderers, hitchhikers, and travellers, drifters are those who roam the stars without obvious purpose or direction.",
	hasCommission: false,
	qualification: false,
	qualificationStat: null,
	//TODO: DRIFTER QUALIFICATION BREAKING CHANGES
	qualificationDC: null,
	eventList: {
		2: {
			type: "redirect",
			destination: "mishap",
			description: "Disaster!",
			noMuster: true,
		},
		3: {
			type: "choice",
			description: "A patron offers you a chance at a job.",
			choiceList: ["a", "b"],
			choice: {
				a: {
					type: "reward",
					description:
						"You accept, but they hint that they will collect that favor one day.",
					button: "Accept",
					result: {
						type: "multiple",
						list: ["qual", "patron"],
						details: {
							qual: { type: "qualification", value: 4, career: 'any', expires: false },
							patron: {
								type: "favor",
								description:
									"Patron who offered you a chance at a job when you were a drifer.",
							},
						}
					},
				},
				b: {
					type: "generic",
					description:
						"You don't trust or want the handout, or 'opportunity' and move on with your life.",
					button: "Refuse",
				},
			}
		},
		4: {
			type: "reward",
			description: "You pick up a few useful skills here and there.",
			result: {
				type: "choice",
				choiceType: "increaseSkill",
				choiceList: [
					"JackOfAllTrades",
					"Survival",
					"Streetwise",
					"Melee",
				],
				specialty: {
					JackOfAllTrades: null,
					Survival: null,
					Streetwise: null,
					Melee: "any",
				},
			},
		},
		5: {
			type: "reward",
			description: "You manage to scavenge something useful.",
			result: { type: "benefit", value: 1 },
		},
		6: { type: "redirect", destination: "unusual" },
		7: { type: "redirect", destination: "life" },
		8: {
			type: "check",
			description: "Your life is a rough one - and today's one of those days where you have to be tough enough - or clever enough - to survive.",
			checkType: "choice",
			choiceList: ["Melee", "GunCombat", "Stealth"],
			specialtyList: { Melee: "any", GunCombat: "any", Stealth: null },
			checkDC: 8,
			pass: {
				description: "You manage to avoid injury.",
				type: "generic",
			},
			fail: {
				description: "You fail to avoid injury.",
				type: "redirect",
				destination: "injury",
			},
		},
		9: {
			type: "choice",
			description:
				"You are offered the chance to participate in a risky but rewarding venture.",
			choiceList: ["a", "b"],
			choice: {
				a: { type: "special", specialType: "drifterRandom" },
				b: { type: 'generic', description: "You decide to play it safe."},
			}
		},
		10: {
			type: "reward",
			description: "Life on the edge hones your abilities.",
			result: { type: "choice", choiceType: "increaseAny" },
		},
		11: {
			type: "special",
			specialType: "draft"
		},
		12: {
			type: "reward",
			description: "You thrive on adversity",
			result: { type: "promotion" },
		},
	},
	mishapList: [
		{
			type: "redirect",
			destination: "injury table",
			modifier: "disadvantage",
		},
		{ type: "redirect", destination: "injury table" },
		{
			type: "reward",
			description:
				"You run afoul of a criminal gang, corrupt bureaucrat, or other foe.",
			result: {
				type: "enemy",
				value: 1,
				description: "Enemy who drove you out of your drifter niche.",
			},
		},
		{
			type: "reward",
			description: "You suffer from a life threatening illness.",
			result: { type: "stat", stat: "end", value: -1 },
		},
		{ type: "special", specialType: "betrayal" },
		{
			description:
				"You have no idea what happened to you - there is a gap in your memory.",
			type: "generic",
		},
	],
	skills: {
		personal: [
			{ type: "stat", stat: "str" },
			{ type: "stat", stat: "end" },
			{ type: "stat", stat: "dex" },
			{ type: "skill", skill: "Language", specialty: {Language: 'any'}},
			{ type: "skill", skill: "Profession", specialty: {Profession: 'any'} },
			{ type: "skill", skill: "JackOfAllTrades", specialty: {JackOfAllTrades: null} },
		],
		service: [
			{ type: "skill", skill: "Athletics", specialty: {Athletics: "any"} },
			{ type: "skill", skill: "Melee", specialty: {Melee: "unarmed"}},
			{ type: "skill", skill: "Recon", specialty: {Recon: null} },
			{ type: "skill", skill: "Streetwise", specialty: {Streetwise: null} },
			{ type: "skill", skill: "Stealth", specialty: {Stealth: null}},
			{ type: "skill", skill: "Survival", specialty: {Survival: null} },
		],
		specialties: {
			barbarian: [
				{ type: "skill", skill: "Animals", specialty: {Animals: "any"} },
				{ type: "skill", skill: "Carouse", specialty: {Carouse: null} },
				{ type: "skill", skill: "Melee", specialty: {Melee: "blade"}},
				{ type: "skill", skill: "Stealth", specialty: {Stealth: null} },
				{
					type: "skill",
					skill: "Seafarer",
					specialty: {Seafarer: ["personal", "sails"]},
				},
				{ type: "skill", skill: "Survival", specialty: {Survival: null} },
			],
			wanderer: [
				{ type: "skill", skill: "Drive", specialty: {Drive: "any"} },
				{ type: "skill", skill: "Deception", specialty: {Deception: null} },
				{ type: "skill", skill: "Recon", specialty: {Recon: null} },
				{ type: "skill", skill: "Stealth", specialty: {Stealth: null} },
				{ type: "skill", skill: "Streetwise", specialty: {Streetwise: null} },
				{ type: "skill", skill: "Survival", specialty: {Survival: null} },
			],
			scavenger: [
				{ type: "skill", skill: "Pilot", specialty: {Pilot: "small"} },
				{ type: "skill", skill: "Mechanic", specialty: {Mechanic: null} },
				{ type: "skill", skill: "Astrogation", specialty: {Astrogation: null} },
				{ type: "skill", skill: "VaccSuit", specialty: {VaccSuit: null} },
				{ type: "skill", skill: "Profession", specialty: {Profession: "any"} },
				{ type: "skill", skill: "GunCombat", specialty: {GunCombat: "any"} },
			],
		},
	},
	benefits: [
		{ money: 0, misc: "Contact" },
		{ money: 0, misc: "Weapon" },
		{ money: 1000, misc: "Ally" },
		{ money: 2000, misc: "Weapon" },
		{ money: 3000, misc: "edu", miscValue: 1 },
		{ money: 4000, misc: "ShipShare", miscValue: 1 },
		{ money: 8000, misc: "ShipShare", miscValue: 2 },
	],
	specialtiesList: ["barbarian", "wanderer", "scavenger"],
};

export const barbarian: CareerSpecialty = {
	title: "Barbarian",
	description:
		"You live on a primitive world, without the benefits of technology.",
	survivalSkill: "end",
	survivalDC: 7,
	advancementSkill: "str",
	advancementDC: 7,
	eventList: drifter.eventList,
	mishapList: drifter.mishapList,
	ranks: [
		{ title: "Lout", bonus: false },
		{
			title: "Brute",
			bonus: { type: "skill", skill: "Survival", specialty: {Survival: null}, value: 1 },
		},
		{
			title: "Warrior",
			bonus: {
				type: "skill",
				skill: "Melee",
				specialty: {Melee: "blade"},
				value: 1,
			},
		},
		{ title: "Champion", bonus: false },
		{
			title: "Chieftain",
			bonus: { type: "skill", skill: "Leadership", value: 1, specialty: {Leadership: null} },
		},
		{ title: "High Chieftain", bonus: false },
		{ title: "Warlord", bonus: false },
	],
	skills: drifter.skills,
	benefits: drifter.benefits,
	parent: "drifter",
};
export const wanderer: CareerSpecialty = {
	title: "Wanderer",
	description:
		"You are a space bum, living hand-to-mouth in slums and spaceports across the galaxy.",
	survivalSkill: "end",
	survivalDC: 7,
	advancementSkill: "int",
	advancementDC: 7,
	eventList: drifter.eventList,
	mishapList: drifter.mishapList,
	ranks: [
		{ title: "Stray", bonus: false },
		{
			title: "Vagrant",
			bonus: { type: "skill", skill: "Streetwise", specialty: {Streetwise: null}, value: 1 },
		},
		{ title: "Floater", bonus: false },
		{
			title: "Vagabond",
			bonus: { type: "skill", skill: "Deception", specialty: {Deception: null}, value: 1 },
		},
		{ title: "Roamer", bonus: false },
		{ title: "Explorer", bonus: false },
		{ title: "Nomad", bonus: false },
	],
	skills: drifter.skills,
	benefits: drifter.benefits,
	parent: "drifter",
};
export const scavenger: CareerSpecialty = {
	title: "Scavenger",
	description:
		"You work as a belter (an asteroid miner) or on a salvage crew.",
	survivalSkill: "dex",
	survivalDC: 7,
	advancementSkill: "end",
	advancementDC: 7,
	eventList: drifter.eventList,
	mishapList: drifter.mishapList,
	ranks: [
		{ title: "Greenhorn", bonus: false },
		{
			title: "Fungie",
			bonus: { type: "skill", skill: "VaccSuit", specialty: {VaccSuit: null}, value: 1 },
		},
		{ title: "Scavver", bonus: false },
		{
			title: "Hauler",
			bonus: {
				type: "skill",
				skill: "choice",
				choiceList: ["Profession", "Mechanic"],
				specialty: { Profession: "belter", mechanic: null },
			},
		},
		{ title: "Heavy Hauler", bonus: false },
		{ title: "Scav Boss", bonus: false },
		{ title: "Scav Head", bonus: false },
	],
	skills: drifter.skills,
	benefits: drifter.benefits,
	parent: "drifter",
};
