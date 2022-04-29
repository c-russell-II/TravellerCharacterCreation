const lifeEvent = {
    2: {type: 'redirect', description: 'You are injured or become sick.', destination: 'injury'},
    3: {type: 'generic', description: "Someone close to you gives birth or dies, and you are involved somehow."},
    4: {type: 'reward', description: "A romantic relationship involving you ends. Badly.", result:{type: 'rival', description: 'ex-romantic partner.', value: 1}},
    5: {type: 'reward', description: "A romantic relationship involving you deepens, possibly leading to marriage or some other further commitment.", result:{type: 'ally', description: "Romantic partner that is becoming something more."}},
    6: {type: 'reward', description: "You become involved in a new romantic relationship.", result: {type: 'ally', description: "New romantic partner.", value: 1}},
    7: {type: 'reward', description: "You make a new contact in your non-career-related life.", result: {type: 'contact', description: "Made outside of career or education!", value: 1}},
    8: {type: 'special', specialType: 'betrayal'},
    9: {type: 'reward', description: "You move to a new world!", result: {type: 'qualification', value: 2}},
    10: {type: 'reward', description: "Something good happens to you - you come into money unexpectedly, get a book published, or some other stroke of good fortune.", result: {type: 'benefit', value: 2}},
    11: {type: 'choice', choiceList: ['a', 'b'], description: "You are accused of a crime, and must decide if fighting the charge is worth the monetary cost.",
        a: {button: "Pay it!", description: "Throwing some money at it made the charge mysteriously fall apart. How shocking.", result: {type: 'loseBenefit'}},
        b: {button: "Don't pay!", description: "You refuse to pay, and end up in prison.", result: {type: 'prisoner'}}
    },
    12: {type: 'redirect', destination: 'unusual'}
}

const unusual = [
    {type: 'special', specialType: 'psi'},
    {type: 'reward', description: 'You spend time among an alien race.', result: {type: 'multiple', list: ['skill', 'contact'], skill:{type: 'skill', skill: 'science', value: 1}, contact: {type: 'contact', value: 1, description: "Alien met from unusual life event (probably not directly connected to career!"}}},
    {type: 'reward', description: "You have a strange and unusual device from an alien culture that is not normally available to humans.", result: {type: 'misc', description: "Strange and unusual device from unknown, novel, or faraway alien culture."}},
    {type: 'generic', description: "Something happened to you. You have no idea what."},
    {type: 'generic', description: "You briefly came in contact with the highest echelons of the Imperium - perhaps an Archduke or the Emperor- or, perhaps, Imperial Intelligence."},
    {type: 'reward', description: 'You possess an incredibly ancient piece of alien technology- almost certainly older than the Imperium itself.', result: {type: 'misc', description: "Incredibly ancient piece of technology, that pre-dates the Imperium."}}
]

const injury = [
    {type: 'worst'},
    {type: 'severe'},
    {type: 'moderate'},
    {type: 'medium'},
    {type: 'mild'},
    {type: 'none'}
]

const prisonEvent = [
    {type: 'special', specialType: 'riot'},
    {type: 'reward', description: 'You make friends with another inmate.', result: {type: 'contact', description: "Fellow inmate from your time in prison.", value: 1}},
    {type: 'reward', description: 'You gain a new rival among the inmates or guards.', result: {type: 'rival', description: "Rival inmate or guard from your time in prison.", value: 1}},
    {type: 'parole', value: 'reroll'},
    {type: 'parole', value: -2},
    {type: 'check', checkType: 'skill', checkSkill: 'Melee', specialty: 'unarmed', checkDC: 8, pass: {type: 'generic', description: "You defend yourself admirably, and are unharmed."}, fail: {type: 'redirect', destination: 'injury'}, description: "Another inmate attacks you."}
]

const genericTables = {
    life: lifeEvent,
    unusual: unusual,
    injury: injury,
    prisonEvent: prisonEvent
}

export default genericTables;