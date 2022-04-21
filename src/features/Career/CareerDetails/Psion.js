export const psion = {
    title: "Psion",
    description: 'A career for Travellers who choose to focus on their psionic potential instead of more conventional lifestyles.',
    qualification: true,
    qualificationStat: 'psi',
    qualificationDC: 6,
    eventList: {
        2: {type: 'redirect', destination: 'mishap', description: 'Disaster!', result: {type: 'noMuster'}},
        3: {type: 'contactToRival'},
        4: {type: 'reward', description: "You spend significant amounts of time mastering your mind and body, and your skills grow to reflect this.",
            result:{type: 'choice',
                choiceType:'setSkill',
                choiceList: ['Athletics', 'Stealth', 'Survival', 'Art'],
                specialtyList: {Athletics: 'any', Stealth: null, Survival: null, Art: 'any'},
                value: 1
            }
        },
        5: {type: 'choice', description: "You have a chance to use your psionic powers unethically.", choiceList: ['a', 'b'],
            a: {button: 'Do it.',type: 'check', checkType: 'stat', checkStat: 'psi', checkDC: 8,
                pass: {description: "Your attempt bears profitable fruit.", result: {type: 'choice', choiceType: 'multiple', list: ['benefit', 'stat'], benefit: {type: 'addBenefit'}, stat: {type: 'stat', stat: 'soc', value: 1}}},
                fail: {description: "Your attempt backfires.", result: {type: 'stat', stat: 'soc', value: -1}}
            },
            b: {button: "Refrain.", description: "You let your better judgement prevail.", result: {type: 'none'}}
        },
        6: {type: 'reward', description: 'You make an unexpected connection outside normal circles.',
            result: {type: 'contact', description: 'An unexpected connection, outside your normal circles, from your time as a Psion.', value: 1}
        },
        7: {type: 'redirect', destination: 'life'},
        8: {type: 'reward', description: "You achieve a new level of Psionic strength.", result:{type: 'stat', stat: 'psi', value: 1}},
        9: {type: 'check', checkType: 'stat', checkStat: 'edu', checkDC: 8, description: 'You are offered an opportunity for advanced, specialist training.',
            pass: {description: 'Taking full advantage, your skills noticeably increase.', result: {type: 'increaseAny'}},
            fail: {description: "You do not manage to measure up to your instructors' standards.", result: {type: 'none'}}},
        10: {type: 'reward', description: "You pick up potentially useful information from your passive Psionic powers.", result: {type: 'benefit', value: 1}},
        11: {type: 'reward', description: "You gain a mentor.", result: {type: 'multiple', list: ['ally', 'advancement'], ally: {type: 'ally', value: 1, description: "Mentor from Psion career."}, advancement: {type: 'advancement', value: 4}}},
        12: {type: 'reward', description: "You achieve a new level of discipline with your powers.", result: {type: 'promotion'}}
    },
    mishapList: [
        {type: 'redirect', destination:'injury', modifier: 'disadvantage', description: 'You are severely injured...'},
        {type: 'reward', description: "You telepathically contact something dangerous, and are plagued by consistent, terrifying nightmares.", result: {type: 'stat', stat: 'psi', value: -1}},
        {type: 'anti-psi-cult'},
        {type: 'choice', description: "You are asked to use your psionic powers in an unethical fashion.", choiceList: ['a', 'b'],
            a: {button: "Agree.", description: "You do so, and it turns out to have been a test- you have been approved to continue your training.", result: {type: 'multiple', list: ['noMuster', 'enemy'], noMuster: {type: 'noMuster'}, enemy: {type: 'enemy', value: 1, description: "Someone you hurt doing something unethical during your psion career."}}},
            b: {button: "Refuse", description: "It was a test by your superiors, and they decide you are not a good fit for continued enrollment in their organization."}
        },
        {type: 'reward', description: 'You are experimented on by a corporation, government, or other powerful organization - you escape, but cannot return to your psionic career.', result: {type: 'muster'}},
        {type: 'redirect', destination: 'injury'}
    ],
    skills: {
        personal: [
            {type: 'stat', stat: 'edu'},
            {type: 'stat', stat: 'int'},
            {type: 'stat', stat: 'str'},
            {type: 'stat', stat: 'dex'},
            {type: 'stat', stat: 'end'},
            {type: 'stat', stat: 'psi'},
        ],
        service: [
            {type: 'talent', talent: 'Telepathy'},
            {type: 'talent', talent: 'Clairvoyance'},
            {type: 'talent', talent: 'Telekinesis'},
            {type: 'talent', talent: 'Awareness'},
            {type: 'talent', talent: 'Teleportation'},
            {type: 'talent', talent: 'any'},
        ],
        advanced: [
            {type: 'skill', skill:'Language'},
            {type: 'skill', skill:'Art'},
            {type: 'skill', skill:'Electronics'},
            {type: 'skill', skill:'Medic'},
            {type: 'skill', skill:'Science'},
            {type: 'skill', skill:'Mechanic'},
        ],
        specialties: {
            wildTalent: [
                {type: 'talent', skill:'Telepathy'},
                {type: 'talent', skill:'Telekinesis'},
                {type: 'skill', skill:'Deception'},
                {type: 'skill', skill:'Stealth'},
                {type: 'skill', skill:'Streetwise'},
                {type: 'choice', list:['Melee', 'GunCombat']},
            ],
            adept: [
                {type: 'talent', skill:'Telepathy'},
                {type: 'talent', skill:'Clairvoyance'},
                {type: 'talent', skill:'Awareness'},
                {type: 'skill', skill:'Medic'},
                {type: 'skill', skill:'Persuade'},
                {type: 'skill', skill:'Science'},
            ],
            psiWarrior: [
                {type: 'talent', skill:'Telepathy'},
                {type: 'talent', skill:'Awareness'},
                {type: 'talent', skill:'Teleportation'},
                {type: 'skill', skill:'GunCombat'},
                {type: 'skill', skill:'VaccSuit'},
                {type: 'skill', skill:'Recon'},
            ]
        }
    },
    benefits: [
        {money: 1000, misc: 'Gun'},
        {money: 2000, misc: 'ShipShare', miscValue: 2},
        {money: 4000, misc: 'Contact'},
        {money: 4000, misc: 'TAS'},
        {money: 8000, misc: 'Contact'},
        {money: 8000, misc: 'CombatImplant'},
        {money: 16000, misc: 'ShipShare', miscValue: 10},
    ],
    specialtiesList: ['wildTalent', 'adept', 'psiWarrior'],
}

export const wildTalent = {
    title: 'Wild Talent',
    description: 'You developed your powers without formal training.',
    survivalSkill: 'soc',
    survivalDC: 6,
    advancementSkill: 'int',
    advancementDC: 8,
    eventList: psion.eventList,
    mishapList: psion.mishapList,
    ranks: [
        {title: 'Neophyte', bonus: false},
        {title: 'Survivor', bonus: {type: 'choice', choiceList: ['Survival', 'Streetwise'], value: 1}},
        {title: 'Experienced Survivor', bonus: false},
        {title: 'Witch', bonus: {type: 'skill', skill: 'Deception', value: 1}},
        {title: 'Experienced Witch', bonus: false},
        {title: 'Theurgist', bonus: false},
        {title: 'Thaumaturge', bonus: false},
    ],
    skills: psion.skills,
    benefits: psion.benefits,
    parent: 'psion'
}
export const adept = {
    title: 'Adept',
    description: 'You are a scholar of the psychic disciplines.',
    survivalSkill: 'edu',
    survivalDC: 4,
    advancementSkill: 'edu',
    advancementDC: 8,
    eventList: psion.eventList,
    mishapList: psion.mishapList,
    ranks: [
        {title: 'Fledgeling', bonus: false},
        {title: 'Initiate', bonus: {type: 'skill', skill: 'Science', specialty: 'psionicology', value: 1}},
        {title: 'Probationer', bonus: false},
        {title: 'Acolyte', bonus: {type: 'talent', talent: 'any', value: 1}},
        {title: 'Senior Acolyte', bonus: false},
        {title: 'Acolyte Trainer', bonus: false},
        {title: 'Master', bonus: false},
    ],
    skills: psion.skills,
    benefits: psion.benefits,
    parent: 'psion'
}
export const psiWarrior = {
    title: 'Psi-Warrior',
    description: 'You combine combat training with psionic warfare.',
    survivalSkill: 'end',
    survivalDC: 6,
    advancementSkill: 'end',
    advancementDC: 6,
    eventList: psion.eventList,
    mishapList: psion.eventList,
    ranks: [
        {title: 'Marine', bonus: false},
        {title: 'Senior Marine', bonus: {type: 'skill', skill: 'GunCombat', value: 1}},
        {title: 'Captain', bonus: {type: 'skill', skill: 'Leadership', value: 1}},
        {title: 'Senior Captain', bonus: false},
        {title: 'Force Lieutenant', bonus: {type: 'skill', skill: 'Tactics', value: 1}},
        {title: '', bonus: false},
        {title: '', bonus: false},
    ],
    skills: psion.skills,
    benefits: psion.benefits,
    parent: 'psion'
}