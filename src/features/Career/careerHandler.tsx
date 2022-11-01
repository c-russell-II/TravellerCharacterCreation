
export const roll = (num = 6): number => {
    if (typeof num !== 'number') {
        throw new Error('expected a number!');
    }
    return Math.floor(Math.random() * num);
};

export const skillCheck = (stat = 0, skill = 0): number => {
    return roll() + roll() + stat + skill + 2;
};