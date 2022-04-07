//FUCK

export const EduEvents = {
    2: {type: 'Psi'},
    3: {type: 'event', description: "Your time in education is deeply unhappy. Whether it's due to family drama, drugs, or petty school feuds, you crash out and fail to graduate.", result: 'leave'},
    4: {type: 'statCheck', checkStat: 'soc', checkDC: '8',
        pass: {description: 'A supposedly harmless prank goes wrong, and someone gets hurt. Gain a rival.', result: 'rival'},
        fail: {description: 'A supposedly harmless prank goes wrong, and someone gets hurt. Gain an enemy.', result: 'enemy'},
    },
    5: {type: 'reward', result:{type:'skill', skill: 'Carouse', value: 1}, description: 'You take advantage of your youth, and spend some time learning a very valuable skill- how to party.'},
    6: {type: 'reward', result: {type: 'allies', value:'roll d3'}, description: 'You get involved with a tightly knit clique, and make a pact to remain friends forever.'},
    7: {type: 'redirect', destination:'life'},
    8: {type: 'statCheck', checkStat: 'soc', checkDC: '8',
        pass: {description: 'You join - and eventually become a prominent figure in - a political movement. You make a close-knit ally, and a staunch political enemy.', result:'enemy + ally'},
        fail: {description: 'You take up a political movement as something of a hobby or fad, and it quickly fades into memory as you move on to other pursuits.'},
    },
    9: {type: 'reward', result: {type: 'skillChoice', choice: ['any']}, description: 'You develop a healthy hobby- and, perhaps more importantly, one you could tell your dorm-mates was productive.' },
    10: {type: 'checkChoice', choices: ['fucking', 'how'], },
    11: {type: 'WAR', result: 'placeholder'},
    12: {},
}