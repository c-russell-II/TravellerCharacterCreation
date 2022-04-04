// so the goal here is to outline a format and default structure for Events...

const eventTypes = ['choice', 'check', 'choice-check', 'stat-check', 'reward', 'redirect'];

const rewardEvent = {
    type: 'reward',
    roll: 9,
    description: 'placeholder',
    result: {type: 'what does the reward give', value: 'how much does it give'},
}
const rewardTypes = ['skill', 'skill-choice', 'stat', 'stat-choice', 'contacts, allies, enemies', 'advancement', 'promotion'];


const redirectEvent = {
    type: 'redirect',
    roll: 9,
    destination: ['life', 'mishap', 'class', 'unique//rare'],
    modifier: ['disadvantage', 'twice', 'no-job-loss'],
}

const choiceCheck = {
    type: 'choice check',
    roll: 7,
    skillList: ['multiple skills go here'],
    checkDC: 8,
    pass: {description: 'describe outcome', bonus: ['skills, stats, etc', 'might redirect']},
    fail: {description: 'describe outcome', bonus: ['probably none', 'maybe consolation prize', 'maybe punishment']},
    description: 'describe set-up',
}

const check = {
    type: 'skillcheck',
    roll: 8,
    skill: 'skill',
    checkDC: 8,
    pass: {description: 'describe outcome', bonus: ['skills, stats, etc', 'might redirect']},
    fail: {description: 'describe outcome', bonus: ['probably none', 'maybe consolation prize', 'maybe punishment']},
    description: 'describe setup',
}

const statCheck = {
    type: 'statcheck',
    roll: 9,
    stat: 'stat',
    checkDC: 8,
    pass: {describe, bonus: null},
    fail: {describe, bonus: null},
    description: 'describe setup'
}

const choice = {
    type: 'choice',
    roll: 10,
    choiceList: ['a', 'b'],
    a: {description: 'describe', outcome: 'outcome, could be skill checks, could be reward'},
    b: {description: 'describe', outcome: 'outcome, blah blah blah'},
    description: 'describe setup',
}
