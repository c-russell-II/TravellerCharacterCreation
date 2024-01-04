import { ParentCareer } from "../../../features/CareerDetails/CareerTyping";

export const prisoner: ParentCareer = {
    title: 'Prisoner',
    description: 'Every society has its bad apples, and even in the far future punishments usually take place within faceless institutions where criminals can be conveniently forgotton.',
    qualification: false,
    qualificationStat: '',
    qualificationDC: 0,
    eventList: {
        2: {type: 'redirect', destination: 'mishap', description: 'Disaster!'},
        3: {type: 'choice', choiceList: ['a', 'b'], description: "You have a chance to escape prison!",
            choice: {
                a: { button: "Take it!", type: 'check', checkType:'choice', description: "You take your shot, and must choose - lie your way out, or sneak?", choiceList: ['Stealth', 'Deception'], specialtyList: {Stealth: null, Deception: null}, checkDC: 10,
                    pass: {type: 'special', specialType: 'muster'},
                    fail: {description: "Your escape attempt failed!", type: 'reward', result: {type: 'parole', value: 2}}
                },
                b: {button: "Play it safe.", type: 'generic', description: "You decide it isn't worth the risk, and go back to your cell."}
            }
        },
        4: {type: 'check', checkType: 'stat', checkStat: 'end', checkDC: 8, description: "You are assigned to do backbreaking labor.",
            pass: {description: "Your body stands up to it, for now.",
                result: {type: 'multiple',
                    list: ['parole', 'skill'],
                    parole: {type: 'parole', value: -1},
                    skill: {type: 'choice', choiceType: 'setSkill', choiceList: ['Athletics', 'Mechanic', 'Melee'], specialtyList: {Athletics: 'any', Mechanic: null, Melee: 'unarmed'}, value: 1}
                }
            },
            fail: {description: "Your body can't take the strain, and the guards drag you back to your cell at the end of the shift", result: {type: 'ParoleUp', value: 1}}
        },
        5: {type: 'choice', choiceList: ['a', 'b'], description: "You have the opportunity to join a gang.",
            a: {button: "Join!",
                result: {type: 'multiple',
                    list: ['Parole', 'Survival', 'Skill'],
                    Parole: {type: 'parole', value: 1},
                    Survival: {type: 'SurvivalBonus', value: 1},
                    Skill: {type: 'choice', choiceType: 'setSkill', choiceList: ['Athletics', 'Melee', 'Mechanic'], specialtyList:{Athletics: 'any', Melee: 'unarmed', Mechanic: null}, value: 1}
                }
            },
            b: {button: "Nah, man", description: "You just want to keep your head down, but the gang doesn't take kindly to being refused.", type: 'reward', result: {type: 'enemy', value: 1, description: "Gang member, who offered you a place in his gang- and you refused him, while in prison."}}
        },
        6: {type: 'check', checkType: 'stat', checkStat: 'edu', checkDC: 8, description: "Vocational Training.",
            pass: {description: "You learn.", type: 'reward', result: { type: 'choice', choiceType: 'increaseAny'}},
            fail: {description: "You didn't learn much.", type: 'generic'}
        },
        7: {type: 'redirect', destination: 'prisonEvent'},
        8: {type: "reward", description: "Parole Hearing...", result: {type: 'parole', value: -1}},
        9: {type: 'special', specialType: 'newLawyer'},
        10: {type: 'reward', description: "You are given a special responsibility in the prison.",
            result:{type: 'choice',
                choiceType: 'increaseSkill',
                choiceList: ['Admin', 'Advocate', 'Electronics', 'Steward'],
                specialtyList: {Admin: null, Advocate: null, Electronics: 'computers', Steward: null}
            }
        },
        11: {type: 'reward', description: "The warden takes an interest in your case.", result: {type: 'parole', value: -2}},
        12: {type: 'choice', choiceList: ['a', 'b'], description: "You have the opportunity to attempt to save a guard or officer at risk to yourself.",
            a: {button: "Help!", description: "You step forward to help...", 
                result: {type: 'random', roll: '2d', threshold: 8,
                    pass:{description: "You manage to help the guard without getting hurt yourself.", type: 'reward',
                        result: {type: 'multiple',
                            list: ['ally', 'ParoleDown'],
                            ally: {type: 'ally', value: 1, description: 'A prison guard who you rescued from a dangerous situation.'},
                            ParoleDown: {type: 'parole', value: -22}
                        }
                    },
                    fail:{description: "You failed to rescue the guard, and were injured to boot.", type: 'redirect', destination: 'injury'}
                }
            },
            b: {button: "Leave.", description: "You walk away.", type: 'generic'}
        }
    },
    mishapList: [
        {type: 'redirect', destination:'injury', modifier: 'disadvantage', description: 'You are severely injured...'},
        {type: 'reward', description: "You are accused of assaulting a prison guard.", result: {type: 'parole', value: 2}},
        {type: 'choice', choiceList: ['a', 'b'], description:"A prison gang is harassing you- do you let them take few things you have, or do you fight back?",
            a: {button: "Don't fight.", type: 'reward', description: "Deciding it isn't worth it, you let them take what they want.", result: {type: 'addBenefit', value: 'all'}},
            b: {button: "Fight them!",
                result: {type: 'check',
                    checkType: 'skill',
                    checkSkill: 'Melee',
                    specialty: 'unarmed',
                    checkDC: 8,
                    pass: {type: 'reward', description: "You beat several shades out of all your assailants!",
                        result: {type: 'multiple',
                            list: ['Enemy', 'ParoleUp'],
                            Enemy: {type: 'enemy', value: 1, description: "Gang member you met in prison, holds a grudge over you beating the heck out of him and his gang single-handedly."},
                            ParoleUp: {type: 'parole', value: 1}
                        }
                    },
                    fail: {description: "You don't manage to win the fight, but they focus more on beating you up than stealing from you.",
                        type: 'redirect', destination:'injury', modifier: 'disadvantage',
                    }
                }
            }
        },
        {type: 'reward', description: 'A guard takes a dislike to you',
            result: {type: 'multiple', list: ['enemy', 'parole'],
                enemy:{type: 'enemy', value: 1, description: 'Prison guard who decided, for reasons good or bad, that he dislikes you.'},
                parole: {type: 'parole', value: 1}
            }
        },
        {type: 'reward', description: "You find out that word of your criminal status has reached your homeworld...", result: {type: 'stat', stat: 'soc', value: -1}},
        {type: 'redirect', destination: 'injury'}
    ],
    skills: {
        personal: [
            {type: 'stat', stat: 'str'},
            {type: 'skill', skill: 'Melee', specialty: 'unarmed'},
            {type: 'stat', stat: 'end'},
            {type: 'skill', skill:'JackOfAllTrades'},
            {type:'stat', stat: 'edu'},
            {type: 'skill', skill: 'Gambler'}
        ],
        service: [
            {type: 'skill', skill:'Athletics'},
            {type: 'skill', skill:'Deception'},
            {type: 'skill', skill:'Profession'},
            {type: 'skill', skill:'Streetwise'},
            {type: 'skill', skill:'Melee', specialty: 'unarmed'},
            {type: 'skill', skill:'Persuade'},
        ],
        specialties: {
            inmate: [
                {type: 'skill', skill:'Stealth'},
                {type: 'skill', skill:'Melee', specialty: 'unarmed'},
                {type: 'skill', skill:'Streetwise'},
                {type: 'skill', skill:'Survival'},
                {type: 'skill', skill:'Athletics', specialty: 'strength'},
                {type: 'skill', skill:'Mechanic'},
            ],
            thug: [
                {type: 'skill', skill:'Persuade'},
                {type: 'skill', skill:'Melee', specialty: 'unarmed'},
                {type: 'skill', skill:'Melee', specialty: 'unarmed'},
                {type: 'skill', skill:'Melee', specialty: 'blade'},
                {type: 'skill', skill:'Athletics', specialty: 'strength'},
                {type: 'skill', skill:'Athletics', specialty: 'strength'},
            ],
            fixer: [
                {type: 'skill', skill:'Investigate'},
                {type: 'skill', skill:'Broker'},
                {type: 'skill', skill:'Deception'},
                {type: 'skill', skill:'Streetwise'},
                {type: 'skill', skill:'Admin'},
                {type: 'skill', skill:'Stealth'},
            ]
        }
    },
    benefits: [
        {money: 0, misc: 'Contact'},
        {money: 0, misc: 'Blade'},
        {money: 100, misc: 'choice', miscList: ['Deception', 'Persuade', 'Stealth']},
        {money: 200, misc: 'Ally'},
        {money: 500, misc: 'choice', miscList: ['Melee', 'Recon', 'Streetwise'], specialtyList: {Melee: 'any'}},
        {money: 1000, misc: 'choice', miscList: ['str', 'end']},
        {money: 2500, misc: 'choice', miscList: ['Deception', 'Persuade', 'Stealth']},
    ],
    specialtiesList: ['inmate', 'thug', 'fixer'],
}

export const inmate = {
    title: 'Inmate',
    description: 'You just try to get through your time in prison without getting into trouble.',
    survivalSkill: 'end',
    survivalDC: 7,
    advancementSkill: 'str',
    advancementDC: 7,
    eventList: prisoner.eventList,
    mishapList: prisoner.mishapList,
    ranks: [
        {title: '', bonus: {type: 'skill', skill: 'Melee', specialty: 'unarmed', value: 1}},
        {title: '', bonus: false},
        {title: '', bonus: {type: 'skill', skill: 'Athletics', value: 1}},
        {title: '', bonus: false},
        {title: '', bonus: {type: 'skill', skill: 'Advocate', value: 1}},
        {title: '', bonus: false},
        {title: '', bonus: {type: 'stat', stat: 'end', value: 1}},
    ],
    skills: prisoner.skills,
    benefits: prisoner.benefits
}
export const thug = {
    title: 'Thug',
    description: 'You are part of a gang in prison, terrorizing the other inmates.',
    survivalSkill: 'str',
    survivalDC: 8,
    advancementSkill: 'end',
    advancementDC: 6,
    eventList: prisoner.eventList,
    mishapList: prisoner.mishapList,
    ranks: [
        {title: '', bonus: {type: 'skill', skill: 'Melee', specialty: 'unarmed', value: 1}},
        {title: '', bonus: false},
        {title: '', bonus: {type: 'skill', skill: 'Athletics', value: 1}},
        {title: '', bonus: false},
        {title: '', bonus: {type: 'skill', skill: 'Advocate', value: 1}},
        {title: '', bonus: false},
        {title: '', bonus: {type: 'stat', stat: 'end', value: 1}},
    ],
    skills: prisoner.skills,
    benefits: prisoner.benefits
}
export const fixer = {
    title: 'Fixer',
    description: 'You can arrange anything - for the right price.',
    survivalSkill: 'int',
    survivalDC: 9,
    advancementSkill: 'end',
    advancementDC: 5,
    eventList: prisoner.eventList,
    mishapList: prisoner.mishapList,
    ranks: [
        {title: '', bonus: {type: 'skill', skill: 'Melee', specialty: 'unarmed', value: 1}},
        {title: '', bonus: false},
        {title: '', bonus: {type: 'skill', skill: 'Athletics', value: 1}},
        {title: '', bonus: false},
        {title: '', bonus: {type: 'skill', skill: 'Advocate', value: 1}},
        {title: '', bonus: false},
        {title: '', bonus: {type: 'stat', stat: 'end', value: 1}},
    ],
    skills: prisoner.skills,
    benefits: prisoner.benefits
}

export const prisonSpecs = {inmate: inmate, thug: thug, fixer: fixer}