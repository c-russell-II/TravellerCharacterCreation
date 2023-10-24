import { CareerSpecialty, ParentCareer } from "../CareerTyping";

export const merchant: ParentCareer = {
	title: "Merchant",
	hasCommission: false,
	description:
		"Members of a commercial enterprise. Merchants may crew the ships of the huge trading corporations, or they may work for independent freet rades who carry chance cargoes and passengers between worlds.",
	qualification: true,
	qualificationStat: "int",
	qualificationDC: 4,
	eventList: {
		2: {
			type: "redirect",
			destination: "mishap",
			description: "Disaster!",
			noMuster: true,
		},
		3: {
			type: "choice",
			choiceList: ["a", "b"],
			description:
				"You are offered the opportunity to smuggle illegal goods onto a planet.",
			choice: {
				a: {
					button: "Smuggle them",
					description: "You agree to smuggle the goods, and...",
					type: "check",
					checkType: "choice",
					choiceList: ["Deception", "Persuade"],
					specialtyList: { Deception: null, Persuade: null },
					checkDC: 8,
					pass: {
						type: "reward",
						description: "You successfully smuggle them on planet.",
						result: {
							type: "multiple",
							list: ["Streetwise", "benefit"],
							details: {
								Streetwise: {
									type: "setSkill",
									skill: "Streetwise",
									value: 1,
								},
								benefit: { type: "addBenefit", value: 1 },
							},
						},
					},
					fail: {
						description:
							"You don't manage to bring the goods onto the planet, but no grudge is held",
						type: "generic",
					},
				},
				b: {
					button: "Refuse.",
					description:
						"You refuse, and report the person offering to your superiors.",
					type: "reward",
					result: {
						type: "enemy",
						description:
							"Someone you turned in to the authorities while working as a merchant.",
						value: 1,
					},
				},
			},
		},
		4: { type: "special", specialType: "gamble" },
		5: {
			type: "reward",
			description:
				"Your time amongst spacers and suppliers has taught you a few things.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: [
					"Profession",
					"Electronics",
					"Engineer",
					"Animals",
					"Science",
				],
				specialtyList: {
					Profession: "any",
					Electronics: "any",
					Engineer: "any",
					Animals: "any",
					Science: "any",
				},
				value: 1,
			},
		},
		6: {
			type: "reward",
			description:
				"You make an unexpected connection outside normal circles.",
			result: {
				type: "contact",
				description:
					"An unexpected connection, outside your normal circles, from your time as a Merchant.",
				value: 1,
			},
		},
		7: { type: "redirect", destination: "life" },
		8: {
			type: "reward",
			description: "You are embroiled in legal trouble.",
			result: {
				type: "multiple",
				list: ["skill", "prisoner"],
				details: {
					skill: {
						type: "choice",
						choiceType: "setSkill",
						choiceList: [
							"Admin",
							"Advocate",
							"Diplomat",
							"Investigate",
						],
						specialtyList: {
							Admin: null,
							Advocate: null,
							Diplomat: null,
							Investigate: null,
						},
						value: 1,
					},
					//TODO: Prisoner special event in Merchant. AAAAAAAAAAAAAAAAAAAA
					prisoner: { type: "special", specialType: "randomThreshold2"},
				},
			},
		},
		9: {
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
				description:
					"You do not manage to measure up to your instructors' standards.",
				type: "generic",
			},
		},
		10: {
			type: "reward",
			description:
				"A good deal ensures you're living the high life for a few years.",
			result: { type: "benefit", value: 1 },
		},
		11: {
			type: "reward",
			description: "You befriend a useful ally in one sphere.",
			result: {
				type: "multiple",
				list: ["ally", "choice"],
				details: {
					ally: {
						type: "ally",
						value: 1,
						description:
							"A friend you made while working as a Merchant...",
					},
					choice: {
						type: "choice",
						choiceType: "multiple",
						choiceList: ["Carouse", "advancement"],
						choiceDetails: {
							Carouse: {
								type: "increaseSkill",
								skill: "Carouse",
								value: 1,
								button: "Carouse Increase",
							},
							advancement: {
								type: "advancement",
								value: 4,
								button: "Advancement + 4",
							},
						},
					},
				},
			},
		},
		12: {
			type: "reward",
			description: "Your business or ship thrives.",
			result: { type: "promotion" },
		},
	},
	mishapList: [
		{
			type: "redirect",
			description: "You are severely injured...",
			destination: "injury",
			modifier: "disadvantage",
		},
		{
			type: "reward",
			description: "You are bankrupted by a rival.",
			result: {
				type: "multiple",
				list: ["benefits", "rival"],
				details: {
					benefits: { type: "addBenefit", value: 1 },
					rival: {
						type: "rival",
						value: 1,
						description:
							"Rival who bankrupted you, ending your Merchant career.",
					},
				},
			},
		},
		{
			type: "reward",
			description:
				"A sudden war destroys your trade routes and contacts, forcing you to flee that region of space.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: ["Pilot", "GunCombat"],
				specialtyList: { Pilot: "any", GunCombat: "any" },
				value: 1,
			},
		},
		{
			type: "reward",
			description: "Your ship or spaceport is destroyed by criminals.",
			result: {
				type: "enemy",
				value: 1,
				description:
					"Criminals who destroyed the ship or starport you worked on as a Merchant",
			},
		},
		{
			type: "reward",
			description:
				"Imperial trade restrictions force you out of business, but in the process, garner you many newly-criminal contacts...",
			result: { type: "qualification", career: "Rogue", value: 12 },
		},
		{
			type: "reward",
			description:
				"A series of bad deals and decisions force you into bankruptcy, but you salvage as much as you can...",
			result: { type: "addBenefit", value: 1 },
		},
	],
	skills: {
		personal: [
			{ type: "stat", stat: "str" },
			{ type: "stat", stat: "dex" },
			{ type: "stat", stat: "end" },
			{ type: "stat", stat: "int" },
			{ type: "skill", skill: "Language", specialty: {Language: "any"} },
			{ type: "skill", skill: "Streetwise", specialty: {Streetwise: null} },
		],
		service: [
			{ type: "skill", skill: "Drive", specialty: {Drive: "any"} },
			{ type: "skill", skill: "VaccSuit", specialty: {VaccSuit: null} },
			{ type: "skill", skill: "Broker", specialty: {Broker: null} },
			{ type: "skill", skill: "Steward", specialty: {Steward: null} },
			{ type: "skill", skill: "Electronics", specialty: {Electronics: "any"} },
			{ type: "skill", skill: "Persuade", specialty: {Persuade: null} },
		],
		advanced: [
			{ type: "skill", skill: "Engineer", specialty: {Engineer: "any"} },
			{ type: "skill", skill: "Astrogation", specialty: {Astrogation: null} },
			{ type: "skill", skill: "Electronics", specialty: {Electronics: "any"} },
			{ type: "skill", skill: "Pilot", specialty: {Pilot: "any"} },
			{ type: "skill", skill: "Admin", specialty: {Admin: null} },
			{ type: "skill", skill: "Advocate", specialty: {Advocate: null} },
		],
		specialties: {
			merchantMarine: [
				{ type: "skill", skill: "Pilot", specialty: {Pilot: "any"} },
				{ type: "skill", skill: "VaccSuit", specialty: {VaccSuit: null} },
				{ type: "skill", skill: "Athletics", specialty: {Athletics: "any"} },
				{ type: "skill", skill: "Mechanic", specialty: {Mechanic: null} },
				{ type: "skill", skill: "Engineer", specialty: {Engineer: "any"} },
				{ type: "skill", skill: "Electronics", specialty: {Electronics: "any"} },
			],
			freeTrader: [
				{ type: "skill", skill: "Pilot", specialty: {Pilot: "spacecraft"} },
				{ type: "skill", skill: "VaccSuit", specialty: {VaccSuit: null} },
				{ type: "skill", skill: "Deception", specialty: {Deception: null} },
				{ type: "skill", skill: "Mechanic", specialty: {Mechanic: null} },
				{ type: "skill", skill: "Streetwise", specialty: {Streetwise: null} },
				{ type: "skill", skill: "Gunner", specialty: {Gunner: "any"} },
			],
			broker: [
				{ type: "skill", skill: "Admin", specialty: {Admin: null} },
				{ type: "skill", skill: "Advocate", specialty: {Advocate: null} },
				{ type: "skill", skill: "Broker", specialty: {Broker: null} },
				{ type: "skill", skill: "Streetwise", specialty: {Streetwise: null} },
				{ type: "skill", skill: "Deception", specialty: {Deception: null} },
				{ type: "skill", skill: "Persuade", specialty: {Persuade: null} },
			],
		},
	},
	benefits: [
		{ money: 1000, misc: "Blade" },
		{ money: 5000, misc: "int", miscValue: 1 },
		{ money: 10000, misc: "edu", miscValue: 1 },
		{ money: 20000, misc: "Gun" },
		{ money: 20000, misc: "ShipShare", miscValue: 1 },
		{ money: 40000, misc: "Free Trader" },
		{ money: 40000, misc: "Free Trader" },
	],
	specialtiesList: ["merchantMarine", "freeTrader", "broker"],
};

export const merchantMarine: CareerSpecialty = {
	title: "Merchant Marine",
	description:
		"You work on one of the massive cargo haulers run by the Imperium or the megacorporations.",
	survivalSkill: "edu",
	survivalDC: 5,
	advancementSkill: "int",
	advancementDC: 7,
	eventList: merchant.eventList,
	mishapList: merchant.mishapList,
	ranks: [
		{ title: "Crewman", bonus: false },
		{
			title: "Senior Crewman",
			bonus: { type: "skill", skill: "Mechanic", specialty: {Mechanic: null}, value: 1 },
		},
		{ title: "Fourth Officer", bonus: false },
		{ title: "Third Officer", bonus: false },
		{
			title: "Second Officer",
			bonus: { type: "skill", skill: "Pilot", specialty: {Pilot: "any"}, value: 1 },
		},
		{
			title: "First Officer",
			bonus: { type: "stat", stat: "soc", value: 1 },
		},
		{ title: "Captain", bonus: false },
	],
	skills: merchant.skills,
	benefits: merchant.benefits,
	parent: "merchant",
};
export const freeTrader: CareerSpecialty = {
	title: "Free Trader",
	description: "You are part of the crew of a tramp trader.",
	survivalSkill: "dex",
	survivalDC: 6,
	advancementSkill: "int",
	advancementDC: 6,
	eventList: merchant.eventList,
	mishapList: merchant.mishapList,
	ranks: [
		{ title: "Journeyman Trader", bonus: false },
		{
			title: "Novice Trader",
			bonus: { type: "skill", skill: "Persuade", specialty: {Persuade: null}, value: 1 },
		},
		{ title: "Trader", bonus: false },
		{
			title: "Experienced Trader",
			bonus: { type: "skill", skill: "JackOfAllTrades", specialty: {JackOfAllTrades: null}, value: 1 },
		},
		{ title: "Seasoned Trader", bonus: false },
		{ title: "Old Tradehand", bonus: false },
		{ title: "Trade Legend", bonus: false },
	],
	skills: merchant.skills,
	benefits: merchant.benefits,
	parent: "merchant",
};
export const broker: CareerSpecialty = {
	title: "Broker",
	description: "You work in a planetside brokerage or starport.",
	survivalSkill: "edu",
	survivalDC: 5,
	advancementSkill: "int",
	advancementDC: 7,
	eventList: merchant.eventList,
	mishapList: merchant.mishapList,
	ranks: [
		{ title: "Ice broker", bonus: false },
		{
			title: "Green Broker",
			bonus: { type: "skill", skill: "Broker", specialty: {Broker: null}, value: 1 },
		},
		{ title: "Classic Broker", bonus: false },
		{
			title: "Experienced Broker",
			bonus: { type: "skill", skill: "Streetwise", specialty: {Streetwise: null}, value: 1 },
		},
		{ title: "Seasoned Broker", bonus: false },
		{ title: "Accomplished Broker", bonus: false },
		{ title: "Trader's Bane", bonus: false },
	],
	skills: merchant.skills,
	benefits: merchant.benefits,
	parent: "merchant",
};
