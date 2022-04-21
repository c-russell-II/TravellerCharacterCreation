export const marine = {
    title: 'Marine',
    description: 'Members of the armed fighting forces carried aboard starships, marines deal with piracy and boarding actions in space, defend the starports and bases belonging to the navy and supplement ground forces such as the army.',
    qualification: true,
    qualificationAge: 30,
    qualificationStat: 'end',
    qualificationDC: 6,
    eventList: {
        2: {type: 'redirect', destination: 'mishap', description: 'Disaster!', result: {type: 'noMuster'}},
        3: {type: 'reward', description: 'Trapped behind enemy lines, you have to survive on your own.',
            result: {type: 'choice',
                choiceType: 'setSkill',
                choiceList: ['Survival', 'Stealth', 'Deception', 'Streetwise'],
                specialtyList: {Survival: null, Stealth: null, Deception: null, Streetwise: null},
                value: 1
            }
        },
        4: {type: 'reward', description: 'You are assigned to the security staff of a space station.',
            result: {type: 'choice',
                choiceType: 'increaseSkill',
                choiceList:['VaccSuit', 'Athletics'],
                specialtyList: {Vaccsuit: null, Athletics:'dexterity'}
            }
        },
        5: {type: 'check', checkType: 'stat', checkStat: 'edu', checkDC: 8, description: 'You are offered an opportunity for advanced, specialist training.',
            pass: {description: 'Taking full advantage, your skills noticeably increase.', result: {type: 'choice', choiceType: 'setAny', value: 1}},
            fail: {description: "You do not manage to measure up to your instructors' standards.", result: {type: 'none'}}},
        6: {type: 'choiceCheck', choiceList: ['GunCombat', 'Melee'], specialtyList: {GunCombat: 'any', Melee: 'any'}, checkDC: 8, description: 'You lead an assault on an enemy fortress...',
            pass: {description: 'Your assault is a smashing success.',
                result: {type: 'choice',
                    choiceType: 'increaseSkill',
                    choiceList: ['Tactics', 'Leadership'],
                    specialtyList: {Tactics: 'military', Leadership: null}
                }
            },
            fail: {description: 'Your assault is a failure, and you are injured.', result: {type: 'choice', choiceType: 'stat', choiceList: ['end', 'str', 'dex'], value: -1}}
        },
        7: {type: 'redirect', destination: 'life'},
        8: {type: 'reward', description: 'You are on the front lines of a planetary assault and occupation.',
            result:{type:'choice',
                choiceType: 'setSkill',
                choiceList:['Recon', 'GunCombat', 'Leadership', 'Electronics'],
                specialtyList: {Recon: null, GunCombat: 'any', Leadership: null, Electronics: 'comms'}
            }
        },
        9: {type: 'choice', choiceList: ['a', 'b'], description: "A mission goes disastrously wrong due to your commander's error or incompetence, but you emerge unscathed.",
            a:{button: 'Report them!', description: "You report their failure, gaining approval from higher ups, and a new enemy...",
                result: {type: 'multiple',
                    list: ['advancement', 'enemy'],
                    advancement:{type: 'advancement', value: 2},
                    enemy: {type: 'enemy', value: 1, description: 'A commanding officer whose incompetence you outed after a disastrous mission.'}
                }
            },
            b:{button: 'Cover for them!', description: "You cover for them, earning a lifelong ally.",
                result: {type: 'ally', value: 1, description: 'A commanding officer whose disastrous failure you helped cover for.'}
            }
        },
        10: {type: 'reward', description: 'You are assigned to a black ops mission.', result: {type: 'advancement', value: 2}},
        11: {type: 'reward', description: 'Your commanding officer takes an interest in your career.',
            result: {type: 'choice',
                choiceType: 'multiple',
                choiceList: ['advancement', 'Tactics'],
                advancement: {type: 'advancement', value: 4},
                tactics: {type: 'setSkill', specialty: 'any', skill: 'Tactics', value: 1}
            }
        },
        12: {type: 'reward', description: 'You display heroism in battle, earning an automatic promotion.', result: {type: 'promotion'}}
    },
    mishapList: [
        {type: 'redirect', destination:'injury', modifier: 'disadvantage', description: 'You are severely injured...'},
        {type: 'reward', description: 'A mission goes wrong- you and several others are captured and mistreated by the enemy.',
            result: {type: 'multiple',
                list: ['enemy', 'stat'],
                enemy: {type: 'enemy', value: 1, description: 'Jailers from your disastrous mission in the marines'},
                stat: {type: 'choice',
                    choiceType: 'stat',
                    choiceList: ['str', 'dex'],
                    value: -1
                }
            }
        },
        {type: 'reward', description: 'A  mission goes wrong, and you are stranded behind enemy lines.',
            result: {type: 'choice',
                choiceType: 'increaseSkill',
                choiceList:['Stealth', 'Survival'],
                specialtyList: {Stealth: null, Survival: null}
            }
        },
        {type: 'choice', choiceList: ['a', 'b'], description: 'You are ordered to take part in a black ops mission that goes against what you think is right.', 
            a: {button: 'Follow orders',
                result: {type: 'multiple',
                    list: ['enemy', 'noMuster'],
                    enemy: {type: 'enemy', description: 'Lone survivor of a morally dubious black ops mission you participated in.'},
                    noMuster: {type: 'noMuster'}
                }
            },
            b: {button: "Do what's right", result: {type: 'none'}}
        },
        {type: 'reward', description: 'You are tormented by a superior officer or fellow marine.',
            result: {type: 'enemy', value: 1, description: 'A superior or fellow marine who drove you out of the service.'}
        },
        {type: 'redirect', destination: 'injury'}
    ],
    skills: {
        personal: [
            {type: 'stat', stat: 'str'},
            {type: 'stat', stat: 'dex'},
            {type: 'stat', stat: 'end'},
            {type: 'skill', skill:'Gambler'},
            {type: 'skill', skill:'Melee', specialty: 'unarmed'},
            {type: 'skill', skill:'Melee', specialty: 'blade'},
        ],
        service: [
            {type: 'skill', skill:'Athletics', specialty: 'any'},
            {type: 'skill', skill:'VaccSuit'},
            {type: 'skill', skill:'Tactics', specialty: 'any'},
            {type: 'skill', skill:'HeavyWeapons', specialty: 'any'},
            {type: 'skill', skill:'GunCombat', specialty: 'any'},
            {type: 'skill', skill:'Stealth'},
        ],
        advanced: [
            {type: 'skill', skill:'Medic'},
            {type: 'skill', skill:'Survival'},
            {type: 'skill', skill:'Explosives'},
            {type: 'skill', skill:'Engineer', specialty: 'any'},
            {type: 'skill', skill:'Pilot', specialty: 'any'},
            {type: 'skill', skill:'Navigation'},
        ],
        officer:  [
            {type: 'skill', skill:'Electronics', specialty: 'any'},
            {type: 'skill', skill:'Tactics', specialty: 'any'},
            {type: 'skill', skill:'Admin'},
            {type: 'skill', skill:'Advocate'},
            {type: 'skill', skill:'VaccSuit'},
            {type: 'skill', skill:'Leadership'},
        ],
        specialties: {
            support: [
                {type: 'skill', skill:'Electronics'},
                {type: 'skill', skill:'Mechanic'},
                {type: 'choice', list: ['Drive', 'Flyer'], specialties: {Drive: null, Flyer: null}},
                {type: 'skill', skill:'Medic'},
                {type: 'skill', skill:'HeavyWeapons'},
                {type: 'skill', skill:'GunCombat'},
            ],
            starMarine: [
                {type: 'skill', skill:'VaccSuit'},
                {type: 'skill', skill:'Athletics'},
                {type: 'skill', skill:'Gunner'},
                {type: 'skill', skill:'Melee', specialty: 'blade'},
                {type: 'skill', skill:'Electronics'},
                {type: 'skill', skill:'GunCombat'},
            ],
            groundAssault: [
                {type: 'skill', skill:'VaccSuit'},
                {type: 'skill', skill:'HeavyWeapons'},
                {type: 'skill', skill:'Recon'},
                {type: 'skill', skill:'Melee', specialty: 'blade'},
                {type: 'skill', skill:'Tactics', specialty: 'military'},
                {type: 'skill', skill:'GunCombat'},
            ]
        }
    },
    benefits: [
        {money: 2000, misc: 'Armour'},
        {money: 5000, misc: 'int', miscValue: 1},
        {money: 5000, misc: 'edu', miscValue: 1},
        {money: 10000, misc: 'Weapon'},
        {money: 20000, misc: 'TAS'},
        {money: 30000, misc: 'choice', list: ['Armour', 'end'], miscValue: 1},
        {money: 40000, misc: 'soc', miscValue: 2},
    ],
    specialtiesList: ['support', 'starMarine', 'groundAssault'],
}

export const supportMarine = {
    title: 'Support Marine',
    description: 'You are a quartermaster, engineer, or battlefield medic in the marines.',
    survivalSkill: 'end',
    survivalDC: 5,
    advancementSkill: 'edu',
    advancementDC: 7,
    eventList: marine.eventList,
    mishapList: marine.mishapList,
    ranks: [
        {title: 'Marine', bonus: {type: 'choice', list: ['GunCombat', 'Melee'], specialties: {GunCombat: 'any', Melee:'blade'}, value: 1}},
        {title: 'Lance Corporal', bonus: {type: 'skill', skill: 'GunCombat', specialty: 'any', value: 1}},
        {title: 'Corporal', bonus: false},
        {title: 'Lance Sergeant', bonus: {type: 'skill', skill: 'Leadership', value: 1}},
        {title: 'Sergeant', bonus: false},
        {title: 'Gunnery Sergeant', bonus: {type: 'stat', stat: 'end', value: 1}},
        {title: 'Sergeant Major', bonus: false},
    ],
    skills: marine.skills,
    benefits: marine.benefits
}
export const starMarine = {
    title: 'Star Marine',
    description: 'You are trained to fight boarding actions and capture enemy vessels.',
    survivalSkill: 'end',
    survivalDC: 6,
    advancementSkill: 'edu',
    advancementDC: 6,
    eventList: marine.eventList,
    mishapList: marine.mishapList,
    ranks: [
        {title: 'Marine', bonus: {type: 'choice', list: ['GunCombat', 'Melee'], specialties: {GunCombat: 'any', Melee:'blade'}, value: 1}},
        {title: 'Lance Corporal', bonus: {type: 'skill', skill: 'GunCombat', specialty: 'any', value: 1}},
        {title: 'Corporal', bonus: false},
        {title: 'Lance Sergeant', bonus: {type: 'skill', skill: 'Leadership', value: 1}},
        {title: 'Sergeant', bonus: false},
        {title: 'Gunnery Sergeant', bonus: {type: 'stat', stat: 'end', value: 1}},
        {title: 'Sergeant Major', bonus: false},
    ],
    skills: marine.skills,
    benefits: marine.benefits,
    parent: 'marine'
}
export const groundAssault = {
    title: 'Ground Assault Marine',
    description: 'You are kicked out of a spacecraft in high orbit and told to "capture that planet."',
    survivalSkill: 'end',
    survivalDC: 7,
    advancementSkill: 'edu',
    advancementDC: 5,
    eventList: marine.eventList,
    mishapList: marine.mishapList,
    ranks: [
        {title: 'Marine', bonus: {type: 'choice', list: ['GunCombat', 'Melee'], specialties: {GunCombat: 'any', Melee:'blade'}, value: 1}},
        {title: 'Lance Corporal', bonus: {type: 'skill', skill: 'GunCombat', specialty: 'any', value: 1}},
        {title: 'Corporal', bonus: false},
        {title: 'Lance Sergeant', bonus: {type: 'skill', skill: 'Leadership', value: 1}},
        {title: 'Sergeant', bonus: false},
        {title: 'Gunnery Sergeant', bonus: {type: 'stat', stat: 'end', value: 1}},
        {title: 'Sergeant Major', bonus: false},
    ],
    skills: marine.skills,
    benefits: marine.benefits,
    parent: 'marine'
}