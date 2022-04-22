export const agent = {
    title: 'Agent',
    qualification: true,
    qualificationStat: 'int',
    qualificationDC: 6,
    description: 'Law enforcement agencies, corporate operatives, spies, and others who work in the shadows.',
    eventList: {
        
        2: {type: 'redirect', destination: 'mishap', description: 'Disaster!', result: {type: 'noMuster'}},
        
        3: {type: 'check', checkType: 'choice', choiceList: ['Investigate', 'Streetwise'], specialtyList: {Investigate: null, Streetwise: null}, checkDC: 8, description: 'An investigation turns dangerous...',
            pass: { type: 'reward', description: 'You manage to demonstrate and noticeably improve your tradecraft.',
                result: {
                    type: 'choice',
                    choiceType: 'setSkill',
                    choices: ['Deception', 'Jack-of-All-Trades', 'Persuade', 'Tactics'],
                    specialtyList:{'Deception': null, 'Jack-of-All-Trades': null, 'Persuade': null, 'Tactics': 'any'},
                    value: 1
                }
            },
            fail: {type: 'redirect', description: 'You bite off more than you can chew, and ...', destination: 'mishap'}
        },
        
        4: {type: 'reward', result: {type: 'benefit', value: 1}, description: 'You complete a mission for your superiors, and are suitably rewarded.'},
        
        5: {type: 'reward', result:{type: 'contacts', value:'roll', roll: 2}, description: 'You establish a network of contacts'},
        
        6: {type: 'check', checkType: 'stat', checkStat: 'edu', checkDC: 8, description: 'You are offered an opportunity for advanced, specialist training.',
            pass: {type: 'reward', description: 'Taking full advantage, your skills noticeably increase.', result: {type: 'choice', choiceType: 'increaseAny'}},
            fail: {type: 'generic', description: "However, you do not manage to measure up to your instructors' standards."}},
        
        7: {type: 'redirect', destination: 'life'},
        
        8: {type: 'check', checkType: 'skill', checkSkill: 'Deception', specialty: null, checkDC: 8, description: "You go undercover to investigate an enemy group...",
            pass:{description: "You manage to successfully infilitrate their ranks...", 
                type: 'choice',
                choiceType: 'redirect',
                choiceList:['rogue', 'citizen'],
                resultList: ['event', 'specialist'],
            },
            fail: {description: 'You fail to deceive your targets...',
                type: 'choice',
                choiceType: 'redirect',
                choiceList: ['rogue', 'citizen'],
                resultList: ['mishap']
            }
        },

        9: {type: 'reward',
            result:{type: 'advancement', value: 2},
            description: 'You go above and beyond the call of duty, and are told in no uncertain terms that your next promotion will come easier, should you stay on another term.'
        },
        
        10: {type: 'reward',
            description: 'You are given specialist training in vehicles.',
            result:{type: 'choice',
                choiceType: 'setSkill',
                choiceList: ['Drive', 'Flyer', 'Pilot', 'Gunner'],
                specialtyList: {Drive: 'any', Flyer: 'any', Pilot: 'any', Gunner: 'any'},
                value: 1
            }
        },
        
        11: {type: 'reward',
            description: 'You are befriended by a senior agent, and they offer you either a friend in high places, or unique training opportunities...' ,
            result:{type: 'choice',
                choiceType: 'multiple',
                choiceList: ['Investigate', 'advancement'],
                Investigate: {type: 'setSkill', skill: 'Investigate', value: 1},
                advancement: {type: 'advancement', value:4}
            }
        },
        
        12: {type: 'reward', description: 'Your efforts uncover a massive conspiracy against your employers, you are automatically promoted.', result:{type: 'promotion'}}
    },
    mishapList: [
        {type: 'redirect', destination: 'injury table', modifier: 'disadvantage'},
        
        {type: 'choice', 
            description: 'Someone you are investigating offers you a deal...',
            choiceList: ['a', 'b'],
            a: {description: 'You leave the career, sacrificing some honor, but losing little else...',
                button: 'Accept the deal...',
                result: {type: 'none'}
            },
            b: {description: 'You leave the career after being injured by the one whose deal you refused...',
                button: 'Decline the deal...', 
                result: { type: 'multiple', list: ['redirect', 'enemy', 'choice'],
                    redirect: {type: 'redirect', destination: 'injury', modifier: 'disadvantage'},
                    enemy: {type: 'enemy', value: 1, description: "Someone you were investigating while working your Agent career, who offered you a deal that you refused."},
                    choice: {type: 'choice', choiceType: 'increaseAny'}
                }
            },
        },
        {type: 'check', checkType: 'skill', checkSkill: 'Advocate', specialty: null, checkDC: 8, description: 'An investigation goes horribly wrong-- or right-- ending your career.',
            pass: {type: 'generic', description: 'You manage to defend yourself well enough that you are able to leave amicably...'},
            fail: {type: 'prisoner', description: "You are unable to successfully defend yourself, landing in jail...", result: 'prisoner'}},
        
        {type: 'event', description: 'You learn something better left alone, and gain a new enemy, becoming just a little more familiar with deception...', result:{type: 'multiple', resultList:['enemy', 'skill'], skill:'Deception', }},
        
        {type: null, description: 'You bring your work home with you, and someone close to you is hurt. Choose an ally, a family member, or a contact who is hurt by your work.', result:{target: 'contact, ally, or family member', bonus:'injury'}},
        
        {type: 'redirect', destination: 'injury table'}
    ],
    skills: {
        personal: [
            {type: 'skill', skill: 'GunCombat'},
            {type: 'stat', stat: 'dex'},
            {type: 'stat', stat: 'end'},
            {type: 'skill', skill: 'Melee'},
            {type: 'stat', stat: 'int'},
            {type: 'skill', skill: 'Athletics'}
        ],
        service: [
            {type: 'skill', skill: 'Streetwise'},
            {type: 'skill', skill: 'Drive'},
            {type: 'skill', skill: 'Investigate'},
            {type: 'skill', skill: 'Flyer'},
            {type: 'skill', skill: 'Recon'},
            {type: 'skill', skill: 'GunCombat'}
        ],
        advanced: [
            {type: 'skill', skill: 'Advocate'},
            {type: 'skill', skill: 'Language'},
            {type: 'skill', skill: 'Explosives'},
            {type: 'skill', skill: 'Medic'},
            {type: 'skill', skill: 'VaccSuit'},
            {type: 'skill', skill: 'Electronics'},
        ],
        specialties:{intelligence: [
            {type: 'skill', skill: 'Investigate'},
            {type: 'skill', skill: 'Recon'},
            {type: 'skill', skill: 'Electronics', specialty: 'comms'},
            {type: 'skill', skill: 'Stealth'},
            {type: 'skill', skill: 'Persuade'},
            {type: 'skill', skill: 'Deception'},
        ], lawEnforcement: [
            {type: 'skill', skill: 'Investigate'},
            {type: 'skill', skill: 'Recon'},
            {type: 'skill', skill: 'Streetwise'},
            {type: 'skill', skill: 'Stealth'},
            {type: 'skill', skill: 'Melee'},
            {type: 'skill', skill: 'Advocate'},
        ], corporate: [
            {type: 'skill', skill: 'Investigate'},
            {type: 'skill', skill: 'Electronics', specialty:'computers'},
            {type: 'skill', skill: 'Stealth'},
            {type: 'skill', skill: 'Carouse'},
            {type: 'skill', skill: 'Deception'},
            {type: 'skill', skill: 'Streetwise'},
        ]}
    },
    benefits: [
        {money: 1000, misc: 'Scientific Equipment', miscType:'item'},
        {money: 2000, misc: 'int increase', miscType:'stat up'},
        {money: 5000, misc: 'Ship Share', miscType:'item'},
        {money: 7500, misc: 'Weapon Choice', miscType:'item'},
        {money: 10000, misc: 'Combat Implant Choice', miscType:'item'},
        {money: 25000, misc: 'soc +1 or Combat Implant', miscType:'choice'},
        {money: 50000, misc: 'TAS membership', miscType:'item'}],
    specialtiesList: ['intelligence', 'lawEnforcement', 'corporate'],
}
export const corporate = {
    id: 'corporate',
    title: 'Corporate Agent',
    description: 'You work for a corporation, spying on rival organizations.',
    survivalSkill: 'int',
    survivalDC: 5,
    advancementSkill: 'int',
    advancementDC: 8,
    ranks: [
        {title: 'Novice Agent', bonus: false},
        {title: 'Agent', bonus: {type: 'skill', skill:'Deception', value: 1}},
        {title: 'Field Agent', bonus: {type: 'skill', skill:'Investigate', value: 1}},
        {title: 'Senior Field Agent', bonus: false},
        {title: 'Special Agent', bonus: {type: 'skill', skill:'GunCombat', specialty: 'any', value: 1}},
        {title: 'Assistant Director', bonus: false},
        {title: 'Director', bonus: false}
    ],
    eventList: agent.eventList,
    mishapList: agent.mishapList,
    benefits: agent.benefits,
    skills: agent.skills,
    parent: 'agent',
}
export const lawEnforcement = {
    id: 'lawEnforcement',
    title: 'Law Enforcement Agent',
    description: "You are a police officer or detective.",
    survivalSkill: 'end',
    survivalDC: 6,
    advancementSkill: 'int',
    advancementDC: 6,
    ranks: [
        {title: 'Rookie', bonus: false},
        {title: 'Corporal', rank: 1, bonus:{type: 'skill', skill: 'Streetwise', value: 1}},
        {title: 'Sergeant', bonus: false},
        {title: 'Detective', bonus: false},
        {title:'Lieutenant', rank: 4, bonus: {type: 'skill', skill: 'Investigate', value: 1}},
        {title:'Chief', rank: 5, bonus: {type: 'skill', skill:'Admin', value: 1}},
        {title:'Commisioner', rank: 6, bonus: {type: 'stat', stat: 'soc', value: 1}},
    ],
    eventList: agent.eventList,
    mishapList: agent.mishapList,
    benefits: agent.benefits,
    skills: agent.skills,
    parent: 'agent',
}
export const intelligence = {
    id: 'intelligence',
    title: "Intelligence Agent",
    description: 'You work as a spy or saboteur for a governmental or pseudo-governmental organization.',
    survivalSkill: 'int',
    survivalDC: 7,
    advancementSkill: 'int',
    advancementDC: 5,
    ranks: [
        {title: 'Novice Agent', bonus: false},
        {title: 'Agent', bonus: {type: 'skill', skill:'Deception', value: 1}},
        {title: 'Field Agent', bonus: {type: 'skill', skill:'Investigate', value: 1}},
        {title: 'Senior Field Agent', bonus: false},
        {title: 'Special Agent', bonus: {type: 'skill', skill:'GunCombat', specialty: 'any', value: 1}},
        {title: 'Assistant Director', bonus: false},
        {title: 'Director', bonus: false}
    ],
    eventList: agent.eventList,
    mishapList: agent.mishapList,
    benefits: agent.benefits,
    skills: agent.skills,
    parent: 'agent',
}