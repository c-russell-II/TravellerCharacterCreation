export const rogue = {
    title: 'Rogue',
    description: 'Criminal elements familiar with the rougher or more illegal methods of attaining goals.',
    qualification: true,
    qualificationStat: 'dex',
    qualificationDC: 6,
    eventList: {
        2: {type: 'redirect', destination: 'mishap', description: 'Disaster!', result: {type: 'noMuster'}},
        3: {type: 'choice', choiceList: ['a', 'b'], description: "You are arrested and charged.",
            a:{button: "Hire a Lawyer", description: "The lawyer you hired managed to successfully get the charges against you dropped.",
                result: {type: 'multiple',
                    list: ['contact', 'benefit'],
                    contact: {type: 'contact', value: 1, description: "Lawyer who helped you beat charges while you were a Rogue"},
                    benefit: {type: "addBenefit", value: -1}
                }
            },
            b:{button: "Defend yourself.", description: "You choose to defend yourself.",
                result: {type: 'check',
                    checkType: 'skill',
                    checkSkill: 'Advocate',
                    checkDC: 8,
                    pass: {description: "You successfully get the charges against you dropped.", result: {type: 'none'}},
                    fail: {description: "You fail to defend yourself in court, and are sent to prison.",
                        result: {type: 'multiple',
                            list: ['prisoner', 'enemy'],
                            enemy: {type: 'enemy', description: 'Someone you hurt or implicated while failing to defend yourself against legal action as a Rogue.', value: 1},
                            prisoner: {type: 'prisoner'},
                        }
                    }
                }
            }
        },
        4: {type: 'reward', description: 'You are involved in the planning of an impressive heist.',
            result: {type: 'choice',
                choiceType: 'setSkill',
                choiceList: ['Electronics', 'Mechanic'],
                specialtyList: {Electronics: 'any', Mechanic: null},
                value: 1
            }
        },
        5: {type: 'reward', description: "One of your crimes pays off.",
            result: {type: 'multiple',
                list: ['enemy', 'benefit'],
                enemy: {type: 'enemy', value: 1, description: 'Someone who was a victim of your crimes as a Rogue, directly or otherwise.'},
                benefit: {type: 'benefit', value: 2}
            }
        },
        6: {type: 'choice', choiceList: ['a', 'b'], description: "You have the opportunity to backstab a fellow rogue for personal gain.",
            a:{button: 'Do it.', description: "You make a tidy profit off of betraying your fellow.", result:{type: 'advancement', value: 4}},
            b:{button: "Refuse.", description: "You decide to have some honor, regardless of the saying.", result: {type: 'ally', value: 1, description: "A fellow rogue you had the chance to backstab but chose not to."}},
        },
        7: {type: 'redirect', destination: 'life'},
        8: {type: 'reward', description: "You spend months in the dangerous criminal underworld.",
            result: {type: 'choice',
                choiceType: 'setSkill',
                choiceList: ['Streetwise', 'Stealth', 'Melee', 'GunCombat'],
                specialtyList: {Streetwise: null, Stealth: null, Melee: 'any', GunCombat: 'any'},
                value: 1
            }
        },
        9: {type: 'check', checkType: 'choice', choiceList: ['Stealth', 'GunCombat'], specialtyList: {Stealth: null, GunCombat: 'any'}, checkDC: 8,
            description: "You become involved in a feud with a rival criminal organization...",
            pass: {description: "You manage to come out ahead after the dust settles.", result: {type: 'addBenefit', value: 1}},
            fail: {description: "You are wounded during the fighting.", result: {type: 'redirect', destination: 'injury'}},
        },
        10: {type: 'gamble'},
        11: {type: 'reward',
            description: 'A crime lord considers you his protege.' ,
            result:{type: 'choice',
                choiceType: 'multiple',
                choiceList: ['Tactics', 'advancement'],
                Tactics: {type: 'setSkill', skill: 'Tactics', specialty: 'military', value: 1},
                advancement: {type: 'advancement', value:4}
            }
        },
        12: {type: 'reward', description: 'You commit a legendary crime.', result:{type:'promotion'}}
    },
    mishapList: [
        {type: 'redirect', destination: 'injury table', modifier: 'disadvantage'},
        {type: 'prisoner'},
        {type: 'betrayal'},
        {type: 'reward', description: "A job goes wrong, forcing you to flee off planet.",
            result:{type: 'choice',
                choiceType: 'setSkill',
                choiceList: ['Deception', 'Pilot', 'Athletics', 'Gunner'],
                specialtyList: {Deception: null, Pilot: ['small', 'spacecraft'], Athletics: 'dexterity', Gunner: 'any'},
                value: 1
            },
        },
        {type: 'reward', description: "A police detective or rival criminal forces you to flee, vowing to hunt you down.",
            result:{type: 'enemy', value: 1, description: "A police detective or rival criminal you met while a Rogue, who has vowed to hunt you down"}
        },
        {type: 'redirect', destination: 'injury table'}
    ],
    skills: {
        personal: [
            {type: 'skill', skill: 'Carouse'},
            {type: 'stat', stat: 'dex'},
            {type: 'stat', stat: 'end'},
            {type: 'skill', skill:'Gambler'},
            {type: 'skill', skill:'Melee'},
            {type: 'skill', skill:'GunCombat'},
        ],
        service: [
            {type: 'skill', skill:'Deception'},
            {type: 'skill', skill:'Recon'},
            {type: 'skill', skill:'Athletics'},
            {type: 'skill', skill:'GunCombat'},
            {type: 'skill', skill:'Stealth'},
            {type: 'skill', skill:'Streetwise'},
        ],
        advanced: [
            {type: 'skill', skill:'Electronics'},
            {type: 'skill', skill:'Navigation'},
            {type: 'skill', skill:'Medic'},
            {type: 'skill', skill:'Investigate'},
            {type: 'skill', skill:'Broker'},
            {type: 'skill', skill:'Advocate'},
        ],
        specialties: {
            thief: [
                {type: 'skill', skill:'Stealth'},
                {type: 'skill', skill:'Electronics'},
                {type: 'skill', skill:'Recon'},
                {type: 'skill', skill:'Streetwise'},
                {type: 'skill', skill:'Deception'},
                {type: 'skill', skill:'Athletics'},
            ],
            enforcer: [
                {type: 'skill', skill:'GunCombat'},
                {type: 'skill', skill:'Melee'},
                {type: 'skill', skill:'Streetwise'},
                {type: 'skill', skill:'Persuade'},
                {type: 'skill', skill:'Athletics'},
                {type: 'skill', skill:'Drive'},
            ],
            pirate: [
                {type: 'skill', skill:'Pilot'},
                {type: 'skill', skill:'Astrogation'},
                {type: 'skill', skill:'Gunner'},
                {type: 'skill', skill:'Engineer'},
                {type: 'skill', skill:'VaccSuit'},
                {type: 'skill', skill:'Melee'},
            ]
        }
    },
    benefits: [
        {money: 0, misc: 'ShipShare', miscValue: 1},
        {money: 0, misc: 'Weapon'},
        {money: 10000, misc: 'int', miscValue: 1},
        {money: 10000, misc: 'ShipShare', miscValue: 'roll', miscRoll: 5},
        {money: 50000, misc: 'Armour'},
        {money: 100000, misc: 'dex', miscValue: 1},
        {money: 100000, misc: 'ShipShare', miscValue: 'roll', miscRoll: '2d'},
    ],
    specialtiesList: ['thief', 'enforcer', 'pirate'],
}

export const thief = {
    title: 'Thief',
    description: 'You steal from the rich, and give to..... well, yourself, actually.',
    survivalSkill: 'int',
    survivalDC: 6,
    advancementSkill: 'dex',
    advancementDC: 6,
    eventList: rogue.eventList,
    mishapList: rogue.mishapList,
    ranks: [
        {title: 'Bumbler', bonus: false},
        {title: 'Pickpocket', bonus: {type: 'skill', skill: 'Stealth', value: 1}},
        {title: 'Cutpurse', bonus: false},
        {title: 'Burglar', bonus: {type: 'skill', skill: 'Streetwise', value: 1}},
        {title: 'Experienced Burglar', bonus: false},
        {title: 'True Thief', bonus: {type: 'skill', skill: 'Recon', value: 1}},
        {title: 'Mythical Thief', bonus: false},
    ],
    skills: rogue.skills,
    benefits: rogue.benefits,
    parent: 'rogue'
}
export const enforcer = {
    title: 'Enforcer',
    description: 'You are a leg breaker, thug, or assassin for a criminal group.',
    survivalSkill: 'end',
    survivalDC: 6,
    advancementSkill: 'str',
    advancementDC: 6,
    eventList: rogue.eventList,
    mishapList: rogue.mishapList,
    ranks: [
        {title: 'Punk', bonus: false},
        {title: 'Muscle', bonus: {type: 'skill', skill: 'Persuade', value: 1}},
        {title: 'Thug', bonus: false},
        {title: 'Favoured Thug', bonus: {type: 'choice', list: ['GunCombat', 'Melee'], specialties: {GunCombat: 'any', Melee: 'any'}, value: 1}},
        {title: 'Deputy', bonus: false},
        {title: 'Bodyguard', bonus: {type: 'skill', skill: 'Streetwise', value: 1}},
        {title: 'Assassin', bonus: false},
    ],
    skills: rogue.skills,
    benefits: rogue.benefits,
    parent: 'rogue'
}
export const pirate = {
    title: 'Pirate',
    description: 'You are a space-going corsair.',
    survivalSkill: 'dex',
    survivalDC: 6,
    advancementSkill: 'int',
    advancementDC: 6,
    eventList: rogue.eventList,
    mishapList: rogue.mishapList,
    ranks: [
        {title: 'Lackey', bonus: false},
        {title: 'Henchman', bonus: {type: 'choice', list: ['Pilot', 'Gunner'], specialties: {Pilot: 'any', Gunner: 'any'}, value: 1}},
        {title: 'Corporal', bonus: false},
        {title: 'Sergeant', bonus: {type: 'choice', list: ['GunCombat', 'Melee'], specialties: {GunCombat: 'any', Melee: 'any'}, value: 1}},
        {title: 'Lieutenant', bonus: false},
        {title: 'Leader', bonus: {type: 'choice', list: ['Engineer', 'Navigation'], specialties: {Engineer: 'any', Navigation: null}}},
        {title: 'Captain', bonus: false},
    ],
    skills: rogue.skills,
    benefits: rogue.benefits,
    parent: 'rogue'
}