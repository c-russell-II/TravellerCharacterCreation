const agent = {
    description: 'Law enforcement agencies, corporate operatives, spies, and others who work in the shadows.',
    eventList: [
        
        {type: 'redirect', destination: 'injury', roll: 2},
        
        {type: 'choiceCheck', roll: 3, skillList: ['Investigate', 'Streetwise'], checkDC: 8,
            pass: {description: 'During a dangerous investigation, you demonstrate and noticeably improve your tradecraft.', result: {type: 'skill', choices: ['Deception', 'Jack-of-All-Trades', 'Persuade', 'Tactics'], value: 1}},
            fail: {description: 'During a dangerous investigation, you bite off more than you can chew, and are injured.', result: {type: 'redirect', destination: 'mishap'}}},
        
        {type: 'reward', roll: 4, result: {type: 'benefitPlus', value: 1}},
        
        {type: 'reward', roll: 5, result:{type: 'contacts', value: 'roll d3'}},
        
        {type: 'statCheck', roll: 6, checkStat: 'edu', checkDC: 8, 
            pass: {description: 'You take full advantage of an opportunity for specialist training.', result: {type: 'skill', choices: 'any'}},
            fail: {description: "You are offered an opportunity for specialist training, but you do not measure up to your instructors' standards."}},
        
        {type: 'redirect', destination: 'life', roll: 7},
        
        {type: 'skillCheck', roll: 8, checkSkill: 'Deception', checkDC: 8, description: "You go undercover to investigate an enemy group...",
            pass:{description: "You manage to successfully infilitrate their ranks...", 
                result: {type: 'eventskill', choiceList:['rogue', 'citizen'], choices: {rogue: 'Rogue Skills', citizen: 'Citizen Skills'}, eventList:['rogue', 'citizen'], events: {rogue: 'rogue events', citizen: 'citizen events'}}},
            fail: {description: 'You fail to deceive your targets...', 
                result: {type: 'mishap', eventList: ['rogue', 'citizen'], events: {rogue: 'rogue mishaps', citizen: 'citizen mishaps'}}}},
        
        {type: 'reward', roll: 9, result:{type: 'advancement bonus', value: 2}, description: 'You go above and beyond the call of duty, and are told in no uncertain terms that your next promotion will come easier, should you stay on another term.'},
        
        {type: 'reward', roll: 10, description: 'You are given specialist training in vehicles.', result:{type: 'skillChoice', choice: ['Drive', 'Flyer', 'Pilot', 'Gunner'], value: 1}},
        
        {type: 'reward', roll: 11, description: 'You are befriended by a senior agent, and they offer you either a friend in high places, or unique training opportunities...' , result:{type: 'choice', choice: ['Investigate', {type: 'advancement bonus', value: 4}]}},
        
        {type: 'reward', roll: 12, description: 'Your efforts uncover a massive conspiracy against your employers, you are automatically promoted.'}
    ],
    mishapList: [
        {type: 'redirect', destination: 'injury table', modifier: 'disadvantage'},
        
        {type: 'choice', 
            description: 'Someone you are investigating offers you a deal...',
            choiceList: ['a', 'b'],
            a: {description: 'You leave the career, sacrificing some honor, but losing little else...', results: 'lose benefit, leave career', button: 'Accept the deal...'},
            b: {description: 'You leave the career after being injured by the one whose deal you refused...', results: ['injury table', 'enemy', 'skill level'], button: 'Decline the deal...'}},
        
        {type: 'skillCheck', checkType: 'Advocate', checkDC: 8,  
            pass: {description: 'An investigation goes horribly wrong-- or right-- ending your career. You manage to defend yourself well enough that you are able to leave amicably...'},
            fail: {description: "An investigation goes horribly wrong-- or right-- ending your career, and you are unable to successfully defend yourself, landing in jail...", result: 'prisoner'}},
        
        {type: 'event', description: 'You learn something better left alone, and gain a new enemy, becoming just a little more familiar with deception...', results: 'enemy, deception up'},
        
        {type: 'choice', description: 'You bring your work home with you, and someone close to you is hurt. Choose an ally, a family member, or a contact who is hurt by your work.', results:{target: 'contact, ally, or family member', bonus:'injury'}},
        
        {type: 'redirect', destination: 'injury table'}
    ],
    skills: {
        personal: [
            {type: 'skill', skill: 'Gun Combat'},
            {type: 'stat', stat: 'dex', value: 1},
            {type: 'stat', stat: 'end', value: 1},
            {type: 'skill', skill: 'melee'},
            {type: 'stat', stat: 'int', value: 1},
            {type: 'skill', skill: 'Athletics'}
        ],
        service: [
            {type: 'skill', skill: 'Streetwise'},
            {type: 'skill', skill: 'Drive'},
            {type: 'skill', skill: 'Investigate'},
            {type: 'skill', skill: 'Flyer'},
            {type: 'skill', skill: 'Recon'},
            {type: 'skill', skill: 'Gun Combat'}
        ],
        advanced: [
            {type: 'skill', skill: 'Advocate'},
            {type: 'skill', skill: 'Language'},
            {type: 'skill', skill: 'Explosives'},
            {type: 'skill', skill: 'Medic'},
            {type: 'skill', skill: 'Vacc Suit'},
            {type: 'skill', skill: 'Electronics'},
        ],
        specialties:{intelligence: [
            {type: 'skill', skill: 'Investigate'},
            {type: 'skill', skill: 'Recon'},
            {type: 'skill', skill: 'Electronics - comms'},
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
            {type: 'skill', skill: 'Electronics - computers'},
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
        {money: 25000, misc: 'soc +1 or Combat Implant', miscType:'Choice'},
        {money: 50000, misc: 'TAS membership', miscType:'item'}],
    specialtiesList: ['intelligence', 'lawEnforcement', 'corporate'],
}
const corporate = {
    id: 'corporate',
    title: 'Corporate Agent',
    description: 'You work for a corporation, spying on rival organizations.',
    survivalSkill: 'int',
    survivalDC: 5,
    advancementSkill: 'int',
    advancementDC: 8,
    ranks: [
        {title: 'Novice Agent', rank: 0},
        {title: 'Agent', bonus: 'Deception 1', rank: 1},
        {title: 'Field Agent', bonus: 'Investigate 1', rank: 2},
        {title: 'Senior Field Agent', rank: 3},
        {title: 'Special Agent', bonus: 'Gun Combat 1', rank: 4},
        {title: 'Assistant Director', rank: 5},
        {title: 'Director', rank: 6}
    ],
    eventList: agent.eventList,
    mishapList: agent.mishapList,
    benefits: agent.benefits,
    skills: agent.skills,
    parent: 'agent',
}
const lawEnforcement = {
    id: 'lawEnforcement',
    title: 'Law Enforcement Agent',
    description: "You are a police officer or detective.",
    survivalSkill: 'end',
    survivalDC: 6,
    advancementSkill: 'int',
    advancementDC: 6,
    ranks: [
        {title: 'Rookie', rank: 0},
        {title: 'Corporal', rank: 1, bonus: 'Streetwise 1'},
        {title: 'Sergeant', rank: 2},
        {title: 'Detective', rank: 3},
        {title:'Lieutenant', rank: 4, bonus: 'Investigate 1'},
        {title:'Chief', rank: 5, bonus: 'Admin 1'},
        {title:'Commisioner', rank: 6, bonus: 'Soc + 1'},
    ],
    eventList: agent.eventList,
    mishapList: agent.mishapList,
    benefits: agent.benefits,
    skills: agent.skills,
    parent: 'agent',
}
const intelligence = {
    id: 'intelligence',
    title: "Intelligence Agent",
    description: 'You work as a spy or saboteur for a governmental or pseudo-governmental organization.',
    survivalSkill: 'int',
    survivalDC: 7,
    advancementSkill: 'int',
    advancementDC: 5,
    ranks: [
        {title: 'Novice Agent', rank: 0},
        {title: 'Agent', bonus: 'Deception 1', rank: 1},
        {title: 'Field Agent', bonus: 'Investigate 1', rank: 2},
        {title: 'Senior Field Agent', rank: 3},
        {title: 'Special Agent', bonus: 'Gun Combat 1', rank: 4},
        {title: 'Assistant Director', rank: 5},
        {title: 'Director', rank: 6}
    ],
    eventList: agent.eventList,
    mishapList: agent.mishapList,
    benefits: agent.benefits,
    skills: agent.skills,
    parent: 'agent',
}
// const eventArray = ['one', 'two', 'three', 'four', 'five', 'six'];

export const parentJobs = {
    agent: agent,
    list: ['agent'],
}

const jobObject = {
    intelligence: intelligence,
    lawEnforcement: lawEnforcement,
    corporate: corporate,
    list: ['intelligence', 'lawEnforcement', 'corporate']
}

export default jobObject
// const = {
//     title:,
//     survivalSkill,
//     survivalDC,
//     advancementSkill,
//     advancementDC,
//     eventList,
//     mishapList,
//     ranks,
//     skills,
//     benefits
// }