import { AnyEvent } from "../CareerDetails/CareerTyping";

//FIXME: Typing in education events - Event 3,
export const EduEvents: { [key: number]: AnyEvent } = {
	2: { type: "special", specialType: "Psi" },
	3: {
		type: "special",
		specialType: 'leaveUni'
	},
	4: {
		type: "check",
		checkType: "stat",
		checkStat: "soc",
        description: "You have a really, really clever idea for a prank...",
		checkDC: 8,
		pass: {
			type: "reward",
			description:
				"A supposedly harmless prank goes wrong, and someone gets hurt. Gain a rival.",
			result: {
				type: "rival",
				value: 1,
				description:
					"Someone you hurt with a prank in Uni - whether you meant to or not, they took it as an invitation to push back, starting a rivalry that you never resolved.",
			},
		},
		fail: {
			type: "reward",
			description:
				"A supposedly harmless prank goes wrong, and someone gets hurt. Gain an enemy.",
			result: {
				type: "enemy",
				value: 1,
				description:
					"Someone you hurt with a prank in Uni - they took it personally, and never forgave you, nursing their hatred of you to this day.",
			},
		},
	},
	5: {
		type: "reward",
		result: { type: "increaseSkill", skill: "Carouse", value: 1 },
		description:
			"You take advantage of your youth, and spend some time learning a very valuable skill- how to party.",
	},
	6: {
		type: "reward",
		result: {
			type: "ally",
			description:
				"Close friends from Uni - you made a pact to stay friends forever, and everything.",
			value: 2,
		},
		description:
			"You get involved with a tightly knit clique, and make a pact to remain friends forever.",
	},
	7: { type: "redirect", destination: "life" },
	8: {
		type: "check",
        description: "You start thinking more about your political stances...",
        checkType: 'stat',
		checkStat: "soc",
		checkDC: 8,
		pass: {
            type: 'reward',
			description:
				"You join - and eventually become a prominent figure in - a political movement. You make a close-knit ally, and a staunch political enemy.",
			result: {
				type: "multiple",
				list: ["enemy", "ally"],
				details: {
					enemy: {
						type: "enemy",
						description:
							"Someone who took issue with your political activism in Uni.",
					},
					ally: {
						type: "ally",
                        value: 1,
						description:
							"Someone who respected, and perhaps aided, in your political efforts while in Uni.",
					},
				},
			},
		},
		fail: {
            type: 'generic',
			description:
				"You take up a political movement as something of a hobby or fad, and it quickly fades into memory as you move on to other pursuits.",
		},
	},
	9: {
		type: "reward",
		result: { type: 'choice', choiceType: 'increaseAny' },
		description:
			"You develop a healthy hobby- and, perhaps more importantly, one you could tell your dorm-mates was productive.",
	},
	10: { type: "special", specialType: "newTutor" },
	11: { type: "special", specialType: "war" },
	12: {
		type: "reward",
		description:
			"You gain wide-ranging recognition of your intiative and innovative approach to study.",
		result: { type: "stat", stat: "soc", value: 1 },
	},
};
