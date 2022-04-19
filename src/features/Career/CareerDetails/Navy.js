export const navy = {
    title: 'Navy',
    description: 'Members of the interstellar navy which patrols space between the stars. The navy has the responsibility for the protection of society from foreign powers and lawless elements in the interstellar trade channels.',
    qualification: true,
    qualificationStat: 'int',
    qualificationDC: 6,
    eventList: {
        2: {type: 'redirect', destination: 'mishap', description: 'Disaster!', result: {type: 'noMuster'}},
        3: {type: 'gamble'},
        4: {type: 'reward', description: 'You are given a special assignment or duty on board.', result: {type: 'benefit', value: 1}},
        5: {type: 'check', checkType: 'stat', checkStat: 'edu', checkDC: 8, description: 'You are offered an opportunity for advanced, specialist training.',
            pass: {description: 'Taking full advantage, your skills noticeably increase.', result: {type: 'choice', choiceType: 'increaseAny'}},
            fail: {description: "You do not manage to measure up to your instructors' standards."}},
        6: {type: 'reward', description: 'Your vessel participates in a notable military engagement, from which you learn quite a bit.', result: {type: 'choice', choiceType: 'setSkill', choiceList:['Electronics', 'Engineer', 'Gunner', 'Pilot'], specialtyList:{Electronics: 'any', Engineer: 'any', Gunner: 'any', Pilot: 'any'}, value: 1}},
        7: {type: 'redirect', destination: 'life'},
        8: {type: 'reward', description: "Your vessel participates in a diplomatic mission, teaching you new, more diplomatic skills.", result: {type: 'choice', choiceType: 'multiple', choiceList: ['Recon', 'Diplomat', 'Steward', 'contact'], choiceDetail: {Recon: 'skill', Diplomat: 'skill', Steward: 'skill', contact: 'contact'}, value: 1}},
        9: {type: 'reward', description: 'You foil an attempted mutiny on board.', result: {type: 'multiple', list:['advancement', 'enemy'], enemy: {type: 'enemy', description:'Someone whose mutiny you foiled while in the Navy'}, advancement: {type: 'advancement', value: 2}}},
        10: {type: 'choice', description: "You have the opportunity to abuse your position for profit.", choiceList: ['a', 'b'],
            a: {description: 'You make some money on the side, and no one is hurt by it- or ever finds out.', result: {type: 'addBenefit', value: 1}},
            b: {description: 'You refuse, and point out the possibility to someone in a position to fix the problem.', result: {type: 'advancement', value: 2}},
        },
        11: {type: 'reward', description: 'Your commanding officer takes an active interest in your career.', result:{type: 'choice', choiceList: ['Tactics', 'advancement'], choiceDetail: {'Tactics': 'skill', 'advancement':'advancement'}}},
        12: {type: 'reward', description: 'Your heroism in battle saves your entire vessel.', result: {type: 'promotion'}}
    },
    mishapList: [
        {type: 'redirect', destination:'injury', modifier: 'disadvantage', description: 'You are severely injured...'},
        {type: 'reward', description: "You were woken from cryosleep improperly.", result: {type: 'multiple', list: ['choice', 'noMuster'], choice: {type: 'choice', choiceType: 'stat', choiceList: ['str', 'dex', 'end'], value: -1}, noMuster:{type: 'noMuster'}}},
        {type: 'check'},
        {type: 'choice', description: "You were blamed for an accident that causes the deaths of several of your crewmates.", choiceList: ['a', 'b'],
            a:{button: 'It was you...', description: "Your shame drives you to excel before your court martial sees you ejected from the career.", result: {type: 'skill', skill: 'table'}},
            b:{button: "It wasn't!", description: "You manage to (partially) clear your name, but are still quietly ejected as part of the official whitewash.",
                result: {type: 'multiple', list:['enemy', 'addBenefit'],
                    addBenefit: {type: 'addBenefit', value: 1},
                    enemy: {type: 'enemy', value: 1, description: "An officer who blamed you for an accident, and who lost their career when you proved their accusation false."}
                }
            },
        },
        {type:'reward', description: 'You are tormented by or quarrel with an officer or fellow crewman. They drives you out of the serivce.', result: {type: 'rival', value: 1, description: 'Drove you out of navy career'}},
        {type: 'redirect', destination: 'injury'}
    ],
    skills: {
        personal: [
            {type: 'stat', stat: 'str'},
            {type: 'stat', stat: 'dex'},
            {type: 'stat', stat: 'end'},
            {type: 'stat', stat: 'int'},
            {type: 'stat', stat: 'edu'},
            {type: 'stat', stat: 'soc'}
        ],
        service: [
            {type: 'skill', skill:'Pilot'},
            {type: 'skill', skill:'VaccSuit'},
            {type: 'skill', skill:'Athletics'},
            {type: 'skill', skill:'Gunner'},
            {type: 'skill', skill:'Mechanic'},
            {type: 'skill', skill:'GunCombat'},
        ],
        advanced: [
            {type: 'skill', skill:'Electronics'},
            {type: 'skill', skill:'Astrogation'},
            {type: 'skill', skill:'Engineer'},
            {type: 'skill', skill:'Drive'},
            {type: 'skill', skill:'Navigation'},
            {type: 'skill', skill:'Admin'},
        ],
        officer: [
            {type: 'skill', skill: 'Leadership'},
            {type: 'skill', skill: 'Electronics'},
            {type: 'skill', skill: 'Pilot'},
            {type: 'skill', skill: 'Melee', specialty: 'blade'},
            {type: 'skill', skill: 'Admin'},
            {type: 'skill', skill: 'Tactics', specialty: 'naval'},
        ],
        specialties: {
            lineCrew: [
                {type: 'skill', skill:'Electronics'},
                {type: 'skill', skill:'Mechanic'},
                {type: 'skill', skill:'GunCombat'},
                {type: 'skill', skill:'Flyer'},
                {type: 'skill', skill:'Melee'},
                {type: 'skill', skill:'VaccSuit'},
            ],
            engineerGunner: [
                {type: 'skill', skill:'Engineer'},
                {type: 'skill', skill:'Mechanic'},
                {type: 'skill', skill:'Electronics'},
                {type: 'skill', skill:'Engineer'},
                {type: 'skill', skill:'Gunner'},
                {type: 'skill', skill:'Flyer'},
            ],
            flight: [
                {type: 'skill', skill:'Pilot'},
                {type: 'skill', skill:'Flyer'},
                {type: 'skill', skill:'Gunner'},
                {type: 'skill', skill:'Pilot', specialty:'small'},
                {type: 'skill', skill:'Astrogation'},
                {type: 'skill', skill:'Electronics'},
            ]
        }
    },
    benefits: [
        {money: 1000, misc: 'choice', choiceList: ['Personal Vehicle', 'ShipShare'], 'Personal Vehicle': {type: 'misc'}, ShipShare: {type: 'misc', value: 1}},
        {money: 5000, misc: 'int', miscValue: 1},
        {money: 5000, misc: 'choice', choiceList: ['edu', 'ShipShare'], edu: {type: 'stat', value: 1}, ShipShare: {type: 'misc', value: 2}},
        {money: 10000, misc: 'Weapon'},
        {money: 20000, misc: 'TAS'},
        {money: 50000, misc: 'choice', choiceList: ['Ships Boat', 'ShipShare'], 'Ships Boat':{type: 'misc'}, ShipShare: {type: 'misc', value: 2}},
        {money: 50000, misc: 'soc', miscValue: 2}
    ],
    specialtiesList: ['lineCrew', 'engineerGunner', 'flight'],
}

export const lineCrew = {
    title: 'Line/Crew',
    description: 'You serve as a general crewman or officer on a ship of the line',
    survivalSkill: 'int',
    survivalDC: 5,
    advancementSkill: 'edu',
    advancementDC: 7,
    eventList: navy.eventList,
    mishapList: navy.mishapList,
    ranks: [
        {title: 'Crewman', bonus: false},
        {title: 'Able Spacehand', bonus: {type: 'skill', skill: 'Mechanic', value: 1}},
        {title: 'Petty Officer Third Class', bonus: {type: 'skill', skill:'VaccSuit', value: 1}},
        {title: 'Petty Officer Second Class', bonus: false},
        {title: 'Petty Officer First Class', bonus: {type: 'stat', stat: 'end', value: 1}},
        {title: 'Chief Petty Officer', bonus: false},
        {title: 'Master Chief Petty Officer', bonus: false},
    ],
    skills: navy.skills,
    benefits: navy.benefits
}
export const engineerGunner = {
    title: 'Engineer/Gunner',
    description: 'You serve as a specialist technician on a starship.',
    survivalSkill: 'int',
    survivalDC:6,
    advancementSkill: 'edu',
    advancementDC: 6,
    eventList: navy.eventList,
    mishapList: navy.mishapList,
    ranks: [
        {title: 'Crewman', bonus: false},
        {title: 'Able Spacehand', bonus: {type: 'skill', skill: 'Mechanic', value: 1}},
        {title: 'Petty Officer Third Class', bonus: {type: 'skill', skill:'VaccSuit', value: 1}},
        {title: 'Petty Officer Second Class', bonus: false},
        {title: 'Petty Officer First Class', bonus: {type: 'stat', stat: 'end', value: 1}},
        {title: 'Chief Petty Officer', bonus: false},
        {title: 'Master Chief Petty Officer', bonus: false},
    ],
    skills: navy.skills,
    benefits: navy.benefits
}
export const flight = {
    title: 'Flight',
    description: 'You are a pilot of a shuttle, fighter, or other light craft.',
    survivalSkill: 'dex',
    survivalDC: 7,
    advancementSkill: 'edu',
    advancementDC: 5,
    eventList: navy.eventList,
    mishapList: navy.mishapList,
    ranks: [
        {title: 'Crewman', bonus: false},
        {title: 'Able Spacehand', bonus: {type: 'skill', skill: 'Mechanic', value: 1}},
        {title: 'Petty Officer Third Class', bonus: {type: 'skill', skill:'VaccSuit', value: 1}},
        {title: 'Petty Officer Second Class', bonus: false},
        {title: 'Petty Officer First Class', bonus: {type: 'stat', stat: 'end', value: 1}},
        {title: 'Chief Petty Officer', bonus: false},
        {title: 'Master Chief Petty Officer', bonus: false},
    ],
    skills: navy.skills,
    benefits: navy.benefits
}