import { CareerSpecialty, ParentCareer } from "../CareerTyping";

export const marine: ParentCareer = {
	title: "Marine",
	hasCommission: true,
	description:
		"Members of the armed fighting forces carried aboard starships, marines deal with piracy and boarding actions in space, defend the starports and bases belonging to the navy and supplement ground forces such as the army.",
	qualification: true,
	qualificationAge: 30,
	qualificationStat: "end",
	qualificationDC: 6,
	eventList: {
		2: {
			type: "redirect",
			destination: "mishap",
			description: "Disaster!",
			noMuster: true,
		},
		3: {
			type: "reward",
			description:
				"Trapped behind enemy lines, you have to survive on your own.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: ["Survival", "Stealth", "Deception", "Streetwise"],
				specialtyList: {
					Survival: null,
					Stealth: null,
					Deception: null,
					Streetwise: null,
				},
				value: 1,
			},
		},
		4: {
			type: "reward",
			description:
				"You are assigned to the security staff of a space station.",
			result: {
				type: "choice",
				choiceType: "increaseSkill",
				choiceList: ["VaccSuit", "Athletics"],
				specialty: { Vaccsuit: null, Athletics: "dexterity" },
			},
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
				result: { type: "choice", choiceType: "setAny", value: 1 },
			},
			fail: {
				description:
					"You do not manage to measure up to your instructors' standards.",
				type: "generic",
			},
		},
		6: {
			type: "check",
			checkType: "choice",
			choiceList: ["GunCombat", "Melee"],
			specialtyList: { GunCombat: "any", Melee: "any" },
			checkDC: 8,
			description: "You lead an assault on an enemy fortress...",
			pass: {
				type: "reward",
				description: "Your assault is a smashing success.",
				result: {
					type: "choice",
					choiceType: "increaseSkill",
					choiceList: ["Tactics", "Leadership"],
					specialty: { Tactics: "military", Leadership: null },
				},
			},
			fail: {
				type: "reward",
				description: "Your assault is a failure, and you are injured.",
				result: {
					type: "choice",
					choiceType: "stat",
					choiceList: ["end", "str", "dex"],
					value: -1,
				},
			},
		},
		7: { type: "redirect", destination: "life" },
		8: {
			type: "reward",
			description:
				"You are on the front lines of a planetary assault and occupation.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: ["Recon", "GunCombat", "Leadership", "Electronics"],
				specialtyList: {
					Recon: null,
					GunCombat: "any",
					Leadership: null,
					Electronics: "comms",
				},
				value: 1,
			},
		},
		9: {
			type: "choice",
			choiceList: ["a", "b"],
			description:
				"A mission goes disastrously wrong due to your commander's error or incompetence, but you emerge unscathed.",
			choice: {
				a: {
					button: "Report them!",
					type: "reward",
					description:
						"You report their failure, gaining approval from higher ups, and a new enemy...",
					result: {
						type: "multiple",
						list: ["advancement", "enemy"],
						details: {
							advancement: { type: "advancement", value: 2 },
							enemy: {
								type: "enemy",
								value: 1,
								description:
									"A commanding officer whose incompetence you outed after a disastrous mission.",
							},
						},
					},
				},
				b: {
					button: "Cover for them!",
					description: "You cover for them, earning a lifelong ally.",
					type: "reward",
					result: {
						type: "ally",
						value: 1,
						description:
							"A commanding officer whose disastrous failure you helped cover for.",
					},
				},
			},
		},
		10: {
			type: "reward",
			description: "You are assigned to a black ops mission.",
			result: { type: "advancement", value: 2 },
		},
		11: {
			type: "reward",
			description:
				"Your commanding officer takes an interest in your career.",
			result: {
				type: "choice",
				choiceType: "multiple",
				choiceList: ["advancement", "Tactics"],
				choiceDetails: {
					advancement: {
						type: "advancement",
						value: 4,
						button: "Advancement + 4",
					},
					tactics: {
						type: "setSkill",
						specialty: "any",
						skill: "Tactics",
						value: 1,
						button: "Tactics(any) 1",
					},
				},
			},
		},
		12: {
			type: "reward",
			description:
				"You display heroism in battle, earning an automatic promotion.",
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
			description:
				"A mission goes wrong- you and several others are captured and mistreated by the enemy.",
			result: {
				type: "multiple",
				list: ["enemy", "choice"],
				details: {
					enemy: {
						type: "enemy",
						value: 1,
						description:
							"Jailers from your disastrous mission in the marines",
					},
					choice: {
						type: "choice",
						choiceType: "stat",
						choiceList: ["str", "dex"],
						value: -1,
					},
				},
			},
		},
		{
			type: "reward",
			description:
				"A  mission goes wrong, and you are stranded behind enemy lines.",
			result: {
				type: "choice",
				choiceType: "increaseSkill",
				choiceList: ["Stealth", "Survival"],
				specialty: { Stealth: null, Survival: null },
			},
		},
		{
			type: "choice",
			choiceList: ["a", "b"],
			description:
				"You are ordered to take part in a black ops mission that goes against what you think is right.",
			choice: {
				a: {
					button: "Follow orders",
					type: "reward",
					description:
						"You follow orders, against your own moral beliefs.",
					//TODO: REFACTOR MARINE MISHAP FOR NOMUSTER TO WORK AGAIN!
					// noMuster: true,
					result: {
						type: "enemy",
						description:
							"Lone survivor of a morally dubious black ops mission you participated in.",
						value: 1,
					},
				},
				b: {
					type: "generic",
					description: "You refuse, and are summarily discharged.",
					button: "Do what's right",
				},
			},
		},
		{
			type: "reward",
			description:
				"You are tormented by a superior officer or fellow marine.",
			result: {
				type: "enemy",
				value: 1,
				description:
					"A superior or fellow marine who drove you out of the service.",
			},
		},
		{ type: "redirect", destination: "injury" },
	],
	skills: {
		personal: [
			{ type: "stat", stat: "str" },
			{ type: "stat", stat: "dex" },
			{ type: "stat", stat: "end" },
			{ type: "skill", skill: "Gambler", specialty: {Gambler: null} },
			{ type: "skill", skill: "Melee", specialty: {Melee: "unarmed"} },
			{ type: "skill", skill: "Melee", specialty: {Melee: "blade"} },
		],
		service: [
			{ type: "skill", skill: "Athletics", specialty: {Athletics: "any"} },
			{ type: "skill", skill: "VaccSuit", specialty: {VaccSuit: null} },
			{ type: "skill", skill: "Tactics", specialty: {Tactics: "any"} },
			{ type: "skill", skill: "HeavyWeapons", specialty: {HeavyWeapons: "any"} },
			{ type: "skill", skill: "GunCombat", specialty: {GunCombat: "any"} },
			{ type: "skill", skill: "Stealth", specialty: {Steatlh: null} },
		],
		advanced: [
			{ type: "skill", skill: "Medic", specialty: {Medic: null} },
			{ type: "skill", skill: "Survival", specialty: {Survival: null} },
			{ type: "skill", skill: "Explosives", specialty: {Explosives: null} },
			{ type: "skill", skill: "Engineer", specialty: {Engineer: "any"} },
			{ type: "skill", skill: "Pilot", specialty: {Pilot: "any" }, },
			{ type: "skill", skill: "Navigation", specialty: {Navigation: null} },
		],
		officer: [
			{ type: "skill", skill: "Electronics", specialty: {Electronics: "any"} },
			{ type: "skill", skill: "Tactics", specialty: {Tactics: "any"} },
			{ type: "skill", skill: "Admin", specialty: {Admin: null} },
			{ type: "skill", skill: "Advocate", specialty: {Advocate: null} },
			{ type: "skill", skill: "VaccSuit", specialty: {VaccSuit: null} },
			{ type: "skill", skill: "Leadership", specialty: {Leadership: null} },
		],
		specialties: {
			support: [
				{ type: "skill", skill: "Electronics", specialty: {Electronics: "any"} },
				{ type: "skill", skill: "Mechanic", specialty: {Mechanic: null} },
				{
					type: "choice",
					list: ["Drive", "Flyer"],
					specialty: { Drive: null, Flyer: null },
				},
				{ type: "skill", skill: "Medic", specialty: {Medic: null} },
				{ type: "skill", skill: "HeavyWeapons", specialty: {HeavyWeapons: "any"} },
				{ type: "skill", skill: "GunCombat", specialty: {GunCombat: "any"} },
			],
			starMarine: [
				{ type: "skill", skill: "VaccSuit", specialty: {VaccSuit: null} },
				{ type: "skill", skill: "Athletics", specialty: {Athletics: "any"} },
				{ type: "skill", skill: "Gunner", specialty: {Gunner: "any"} },
				{ type: "skill", skill: "Melee", specialty: {Melee:"blade"} },
				{ type: "skill", skill: "Electronics", specialty: {Electronics: "any"} },
				{ type: "skill", skill: "GunCombat", specialty: {GunCombat: "any"} },
			],
			groundAssault: [
				{ type: "skill", skill: "VaccSuit", specialty: {VaccSuit: null} },
				{ type: "skill", skill: "HeavyWeapons", specialty: {HeavyWeapons: "any"} },
				{ type: "skill", skill: "Recon", specialty: {Recon: null} },
				{ type: "skill", skill: "Melee", specialty: {Melee: "blade"} },
				{ type: "skill", skill: "Tactics", specialty: {Tactics: "military"} },
				{ type: "skill", skill: "GunCombat", specialty: {GunCombat: "any"} },
			],
		},
	},
	benefits: [
		{ money: 2000, misc: "Armour" },
		{ money: 5000, misc: "int", miscValue: 1 },
		{ money: 5000, misc: "edu", miscValue: 1 },
		{ money: 10000, misc: "Weapon" },
		{ money: 20000, misc: "TAS" },
		{
			money: 30000,
			misc: "choice",
			miscList: ["Armour", "end"],
			miscValue: 1,
		},
		{ money: 40000, misc: "soc", miscValue: 2 },
	],
	specialtiesList: ["support", "starMarine", "groundAssault"],
};

export const supportMarine: CareerSpecialty = {
	title: "Support Marine",
	description:
		"You are a quartermaster, engineer, or battlefield medic in the marines.",
	survivalSkill: "end",
	survivalDC: 5,
	advancementSkill: "edu",
	advancementDC: 7,
	eventList: marine.eventList,
	mishapList: marine.mishapList,
	ranks: [
		{
			title: "Marine",
			bonus: {
				type: "skill",
				skill: 'choice',
				choiceList: ["GunCombat", "Melee"],
				specialty: { GunCombat: "any", Melee: "blade" },
				value: 1,
			},
		},
		{
			title: "Lance Corporal",
			bonus: {
				type: "skill",
				skill: "GunCombat",
				specialty: {GunCombat: "any"},
				value: 1,
			},
		},
		{ title: "Corporal", bonus: false },
		{
			title: "Lance Sergeant",
			bonus: { type: "skill", skill: "Leadership", specialty: {Leadership: null}, value: 1 },
		},
		{ title: "Sergeant", bonus: false },
		{
			title: "Gunnery Sergeant",
			bonus: { type: "stat", stat: "end", value: 1 },
		},
		{ title: "Sergeant Major", bonus: false },
	],
	comRanks: [
		{
			title: "Lieutenant",
			bonus: { type: "skill", skill: "Leadership", specialty: {Leadership: null}, value: 1 },
		},
		{ title: "Captain", bonus: false },
		{
			title: "Force Commander",
			bonus: {
				type: "skill",
				skill: "Tactics",
				specialty: {Tactics: "any"},
				value: 1,
			},
		},
		{ title: "Lieutenant Colonel", bonus: false },
		{
			title: "Colonel",
			bonus: { type: "setStat", stat: "soc", threshold: 10, value: 1 },
		},
		{ title: "Brigadier", bonus: false },
	],
	skills: marine.skills,
	benefits: marine.benefits,
	parent: "marine",
};
export const starMarine: CareerSpecialty = {
	title: "Star Marine",
	description:
		"You are trained to fight boarding actions and capture enemy vessels.",
	survivalSkill: "end",
	survivalDC: 6,
	advancementSkill: "edu",
	advancementDC: 6,
	eventList: marine.eventList,
	mishapList: marine.mishapList,
	ranks: [
		{
			title: "Marine",
			bonus: {
				type: "skill",
				skill: 'choice',
				choiceList: ["GunCombat", "Melee"],
				specialty: { GunCombat: "any", Melee: "blade" },
				value: 1,
			},
		},
		{
			title: "Lance Corporal",
			bonus: {
				type: "skill",
				skill: "GunCombat",
				specialty: {GunCombat: "any"},
				value: 1,
			},
		},
		{ title: "Corporal", bonus: false },
		{
			title: "Lance Sergeant",
			bonus: { type: "skill", skill: "Leadership", specialty: {Leadership: null}, value: 1 },
		},
		{ title: "Sergeant", bonus: false },
		{
			title: "Gunnery Sergeant",
			bonus: { type: "stat", stat: "end", value: 1 },
		},
		{ title: "Sergeant Major", bonus: false },
	],
	comRanks: [
		{
			title: "Lieutenant",
			bonus: { type: "skill", skill: "Leadership", specialty: {Leadership: null}, value: 1 },
		},
		{ title: "Captain", bonus: false },
		{
			title: "Force Commander",
			bonus: {
				type: "skill",
				skill: "Tactics",
				specialty: {Tactics: "any"},
				value: 1,
			},
		},
		{ title: "Lieutenant Colonel", bonus: false },
		{
			title: "Colonel",
			bonus: { type: "setStat", stat: "soc", threshold: 10, value: 1 },
		},
		{ title: "Brigadier", bonus: false },
	],
	skills: marine.skills,
	benefits: marine.benefits,
	parent: "marine",
};
export const groundAssault: CareerSpecialty = {
	title: "Ground Assault Marine",
	description:
		'You are kicked out of a spacecraft in high orbit and told to "capture that planet."',
	survivalSkill: "end",
	survivalDC: 7,
	advancementSkill: "edu",
	advancementDC: 5,
	eventList: marine.eventList,
	mishapList: marine.mishapList,
	ranks: [
		{
			title: "Marine",
			bonus: {
				type: "skill",
				skill: 'choice',
				choiceList: ["GunCombat", "Melee"],
				specialty: { GunCombat: "any", Melee: "blade" },
				value: 1,
			},
		},
		{
			title: "Lance Corporal",
			bonus: {
				type: "skill",
				skill: "GunCombat",
				specialty: {GunCombat: "any"},
				value: 1,
			},
		},
		{ title: "Corporal", bonus: false },
		{
			title: "Lance Sergeant",
			bonus: { type: "skill", skill: "Leadership", specialty: {Leadership: null}, value: 1 },
		},
		{ title: "Sergeant", bonus: false },
		{
			title: "Gunnery Sergeant",
			bonus: { type: "stat", stat: "end", value: 1 },
		},
		{ title: "Sergeant Major", bonus: false },
	],
	comRanks: [
		{
			title: "Lieutenant",
			bonus: { type: "skill", skill: "Leadership", specialty: {Leadership: null}, value: 1 },
		},
		{ title: "Captain", bonus: false },
		{
			title: "Force Commander",
			bonus: {
				type: "skill",
				skill: "Tactics",
				specialty: {Tactics: "any"},
				value: 1,
			},
		},
		{ title: "Lieutenant Colonel", bonus: false },
		{
			title: "Colonel",
			bonus: { type: "setStat", stat: "soc", threshold: 10, value: 1 },
		},
		{ title: "Brigadier", bonus: false },
	],
	skills: marine.skills,
	benefits: marine.benefits,
	parent: "marine",
};
