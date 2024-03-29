import { CareerSpecialty, ParentCareer } from "../CareerTyping";

export const rogue: ParentCareer = {
	title: "Rogue",
	hasCommission: false,
	description:
		"Criminal elements familiar with the rougher or more illegal methods of attaining goals.",
	qualification: true,
	qualificationStat: "dex",
	qualificationDC: 6,
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
			description: "You are arrested and charged.",
			choice: {
				a: {
					type: "reward",
					button: "Hire a Lawyer",
					description:
						"The lawyer you hired managed to successfully get the charges against you dropped.",
					result: {
						type: "multiple",
						list: ["contact", "addBenefit"],
						details: {
							contact: {
								type: "contact",
								value: 1,
								description:
									"Lawyer who helped you beat charges while you were a Rogue",
							},
							addBenefit: { type: "addBenefit", value: -1 },
						},
					},
				},
				b: {
					button: "Defend yourself.",
					description: "You choose to defend yourself.",
					type: "check",
					checkType: "skill",
					checkSkill: "Advocate",
					specialty: null,
					checkDC: 8,
					pass: {
						description:
							"You successfully get the charges against you dropped.",
						type: "generic",
					},
					fail: {
						type: "reward",
						description:
							"You fail to defend yourself in court, and are sent to prison.",
						result: {
							type: "multiple",
							list: ["prisoner", "enemy"],
							details: {
								enemy: {
									type: "enemy",
									description:
										"Someone you hurt or implicated while failing to defend yourself against legal action as a Rogue.",
									value: 1,
								},
								prisoner: {
									type: "special",
									specialType: "prisoner",
								},
							},
						},
					},
				},
			},
		},
		4: {
			type: "reward",
			description:
				"You are involved in the planning of an impressive heist.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: ["Electronics", "Mechanic"],
				specialtyList: { Electronics: "any", Mechanic: null },
				value: 1,
			},
		},
		5: {
			type: "reward",
			description: "One of your crimes pays off.",
			result: {
				type: "multiple",
				list: ["enemy", "benefit"],
				details: {
					enemy: {
						type: "enemy",
						value: 1,
						description:
							"Someone who was a victim of your crimes as a Rogue, directly or otherwise.",
					},
					benefit: { type: "benefit", value: 2 },
				},
			},
		},
		6: {
			type: "choice",
			choiceList: ["a", "b"],
			description:
				"You have the opportunity to backstab a fellow rogue for personal gain.",
			choice: {
				a: {
					type: "reward",
					button: "Do it.",
					description:
						"You make a tidy profit off of betraying your fellow.",
					result: { type: "advancement", value: 4 },
				},
				b: {
					type: "reward",
					button: "Refuse.",
					description:
						"You decide to have some honor, regardless of the saying.",
					result: {
						type: "ally",
						value: 1,
						description:
							"A fellow rogue you had the chance to backstab but chose not to.",
					},
				},
			},
		},
		7: { type: "redirect", destination: "life" },
		8: {
			type: "reward",
			description:
				"You spend months in the dangerous criminal underworld.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: ["Streetwise", "Stealth", "Melee", "GunCombat"],
				specialtyList: {
					Streetwise: null,
					Stealth: null,
					Melee: "any",
					GunCombat: "any",
				},
				value: 1,
			},
		},
		9: {
			type: "check",
			checkType: "choice",
			choiceList: ["Stealth", "GunCombat"],
			specialtyList: { Stealth: null, GunCombat: "any" },
			checkDC: 8,
			description:
				"You become involved in a feud with a rival criminal organization...",
			pass: {
				type: "reward",
				description:
					"You manage to come out ahead after the dust settles.",
				result: { type: "addBenefit", value: 1 },
			},
			fail: {
				description: "You are wounded during the fighting.",
				type: "redirect",
				destination: "injury",
			},
		},
		10: { type: "special", specialType: "gamble" },
		11: {
			type: "reward",
			description: "A crime lord considers you his protege.",
			result: {
				type: "choice",
				choiceType: "multiple",
				choiceList: ["Tactics", "advancement"],
				choiceDetails: {
					Tactics: {
						type: "setSkill",
						skill: "Tactics",
						specialty: "military",
						value: 1,
						button: "Tactics(military) 1",
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
			description: "You commit a legendary crime.",
			result: { type: "promotion" },
		},
	},
	mishapList: [
		{
			type: "redirect",
			destination: "injury table",
			modifier: "disadvantage",
		},
		{ type: "special", specialType: "prisoner" },
		{ type: "special", specialType: "betrayal" },
		{
			type: "reward",
			description: "A job goes wrong, forcing you to flee off planet.",
			result: {
				type: "choice",
				choiceType: "setSkill",
				choiceList: ["Deception", "Pilot", "Athletics", "Gunner"],
				specialtyList: {
					Deception: null,
					Pilot: ["small", "spacecraft"],
					Athletics: "dexterity",
					Gunner: "any",
				},
				value: 1,
			},
		},
		{
			type: "reward",
			description:
				"A police detective or rival criminal forces you to flee, vowing to hunt you down.",
			result: {
				type: "enemy",
				value: 1,
				description:
					"A police detective or rival criminal you met while a Rogue, who has vowed to hunt you down",
			},
		},
		{ type: "redirect", destination: "injury table" },
	],
	skills: {
		personal: [
			{ type: "skill", skill: "Carouse", specialty: {Carouse: null} },
			{ type: "stat", stat: "dex" },
			{ type: "stat", stat: "end" },
			{ type: "skill", skill: "Gambler", specialty: {Gambler: null} },
			{ type: "skill", skill: "Melee", specialty: {Melee: "any"} },
			{ type: "skill", skill: "GunCombat", specialty: {GunCombat: "any"} },
		],
		service: [
			{ type: "skill", skill: "Deception", specialty: {Deception: null} },
			{ type: "skill", skill: "Recon", specialty: {Recon: null} },
			{ type: "skill", skill: "Athletics", specialty: {Athletics: "any"} },
			{ type: "skill", skill: "GunCombat", specialty: {GunCombat: "any"} },
			{ type: "skill", skill: "Stealth", specialty: {Stealth: null} },
			{ type: "skill", skill: "Streetwise", specialty: {Streetwise: null} },
		],
		advanced: [
			{ type: "skill", skill: "Electronics", specialty: {Electronics: "any"} },
			{ type: "skill", skill: "Navigation", specialty: {Navigation: null} },
			{ type: "skill", skill: "Medic", specialty: {Medic: null} },
			{ type: "skill", skill: "Investigate", specialty: {Investigate: null} },
			{ type: "skill", skill: "Broker", specialty: {Broker: null} },
			{ type: "skill", skill: "Advocate", specialty: {Advocate: null} },
		],
		specialties: {
			thief: [
				{ type: "skill", skill: "Stealth", specialty: {Steatlh: null} },
				{ type: "skill", skill: "Electronics", specialty: {Electronics: "any"} },
				{ type: "skill", skill: "Recon", specialty: {Recon: null} },
				{ type: "skill", skill: "Streetwise", specialty: {Streetwise: null} },
				{ type: "skill", skill: "Deception", specialty: {Deception: null} },
				{ type: "skill", skill: "Athletics", specialty: {Athletics: "any"} },
			],
			enforcer: [
				{ type: "skill", skill: "GunCombat", specialty: {GunCombat: "any"} },
				{ type: "skill", skill: "Melee", specialty: {Melee: "any"} },
				{ type: "skill", skill: "Streetwise", specialty: {Streetwise: null} },
				{ type: "skill", skill: "Persuade", specialty: {Persuade: null} },
				{ type: "skill", skill: "Athletics", specialty: {Athletics: "any"} },
				{ type: "skill", skill: "Drive", specialty: {Drive: "any"} },
			],
			pirate: [
				{ type: "skill", skill: "Pilot", specialty: {Pilot: "any"} },
				{ type: "skill", skill: "Astrogation", specialty: {Astrogation: null} },
				{ type: "skill", skill: "Gunner", specialty: {Gunner: "any"} },
				{ type: "skill", skill: "Engineer", specialty: {Engineer: "any"} },
				{ type: "skill", skill: "VaccSuit", specialty: {VaccSuit: null} },
				{ type: "skill", skill: "Melee", specialty: {Melee: "any"} },
			],
		},
	},
	benefits: [
		//TODO: MISCVALUE ROll in rogue bonUS FOR SHIp sharES
		{ money: 0, misc: "ShipShare", miscValue: 1 },
		{ money: 0, misc: "Weapon" },
		{ money: 10000, misc: "int", miscValue: 1 },
		{ money: 10000, misc: "ShipShare", miscValue: "roll", miscRoll: 5 },
		{ money: 50000, misc: "Armour" },
		{ money: 100000, misc: "dex", miscValue: 1 },
		{ money: 100000, misc: "ShipShare", miscValue: "roll", miscRoll: "2d" },
	],
	specialtiesList: ["thief", "enforcer", "pirate"],
};

export const thief: CareerSpecialty = {
	title: "Thief",
	description:
		"You steal from the rich, and give to..... well, yourself, actually.",
	survivalSkill: "int",
	survivalDC: 6,
	advancementSkill: "dex",
	advancementDC: 6,
	eventList: rogue.eventList,
	mishapList: rogue.mishapList,
	ranks: [
		{ title: "Bumbler", bonus: false },
		{
			title: "Pickpocket",
			bonus: { type: "skill", skill: "Stealth", specialty: {Stealth: null}, value: 1 },
		},
		{ title: "Cutpurse", bonus: false },
		{
			title: "Burglar",
			bonus: { type: "skill", skill: "Streetwise", specialty: {Streetwise: null}, value: 1 },
		},
		{ title: "Experienced Burglar", bonus: false },
		{
			title: "True Thief",
			bonus: { type: "skill", skill: "Recon", specialty: {Recon: null}, value: 1 },
		},
		{ title: "Mythical Thief", bonus: false },
	],
	skills: rogue.skills,
	benefits: rogue.benefits,
	parent: "rogue",
};
export const enforcer: CareerSpecialty = {
	title: "Enforcer",
	description:
		"You are a leg breaker, thug, or assassin for a criminal group.",
	survivalSkill: "end",
	survivalDC: 6,
	advancementSkill: "str",
	advancementDC: 6,
	eventList: rogue.eventList,
	mishapList: rogue.mishapList,
	ranks: [
		{ title: "Punk", bonus: false },
		{
			title: "Muscle",
			bonus: { type: "skill", skill: "Persuade", specialty: {Persuade: null}, value: 1 },
		},
		{ title: "Thug", bonus: false },
		{
			title: "Favoured Thug",
			bonus: {
				type: "skill",
				skill: "choice",
				choiceList: ["GunCombat", "Melee"],
				specialty: { GunCombat: "any", Melee: "any" },
				value: 1,
			},
		},
		{ title: "Deputy", bonus: false },
		{
			title: "Bodyguard",
			bonus: { type: "skill", skill: "Streetwise", specialty: {Streetwise: null}, value: 1 },
		},
		{ title: "Assassin", bonus: false },
	],
	skills: rogue.skills,
	benefits: rogue.benefits,
	parent: "rogue",
};
export const pirate: CareerSpecialty = {
	title: "Pirate",
	description: "You are a space-going corsair.",
	survivalSkill: "dex",
	survivalDC: 6,
	advancementSkill: "int",
	advancementDC: 6,
	eventList: rogue.eventList,
	mishapList: rogue.mishapList,
	ranks: [
		{ title: "Lackey", bonus: false },
		{
			title: "Henchman",
			bonus: {
				type: "skill",
				skill: "choice",
				choiceList: ["Pilot", "Gunner"],
				specialty: { Pilot: "any", Gunner: "any" },
				value: 1,
			},
		},
		{ title: "Corporal", bonus: false },
		{
			title: "Sergeant",
			bonus: {
				type: "skill",
				skill: "choice",
				choiceList: ["GunCombat", "Melee"],
				specialty: { GunCombat: "any", Melee: "any" },
				value: 1,
			},
		},
		{ title: "Lieutenant", bonus: false },
		{
			title: "Leader",
			bonus: {
				type: "skill",
				skill: "choice",
				choiceList: ["Engineer", "Navigation"],
				specialty: { Engineer: "any", Navigation: null },
			},
		},
		{ title: "Captain", bonus: false },
	],
	skills: rogue.skills,
	benefits: rogue.benefits,
	parent: "rogue",
};
