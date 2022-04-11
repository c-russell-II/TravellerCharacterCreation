import jobObject from "./CareerDetails";


// Helper func for die rolls, with modifiers and advantage
export const roll = (num = 6) => {
    if (typeof num !== 'number') {
        throw new Error('expected a number!');
    }
    return Math.floor(Math.random() * num);
}

export const skillCheck = (stat = 0, skill = 0) => {
    return roll() + roll() + stat + skill + 2;
}

// carrer handler function

export const careerTermHandler = (job, stats) => {
    // assigns the stats from the job in the job object to local variables

    const {survivalSkill, advancementSkill} = job;

    const event = job.eventList[roll() + roll() + 2]

    // builds the object we'll eventually return

    const results = {
        job: job,
        jobDetails: jobObject[job.id],
        newEvent: job.mishapList[roll()],
        survive: false,
        advance: false,
    }

    // checks if you pass the survival check for this term and set relevant property in results obj

    results.survive = job.survivalDC <= skillCheck(stats[survivalSkill]);

    results.advance = job.advancementDC <= skillCheck(stats[advancementSkill]);

    if (results.survive) {
        results.newEvent = event;
    }
    // returns the modified object

    return results;
}


export const careerFuncs = {
    handler: careerTermHandler,
    job: jobObject,
    list: jobObject.list
}