declare module "*.module.css" {
	const classes: { [key: string]: string };
	export default classes;
}
declare interface Strength {
	str: number;
}
declare interface Dexterity {
    dex: number
}
declare interface Endurance {
    end: number
}
declare interface Intellect {
    int: number
}
declare interface Education {
    edu: number
}
declare interface SocialStanding {
    soc: number
}
declare interface Age {
    age: number
}
declare interface Psi {
    psi?: number
}
declare type CharaStats = Strength & Dexterity & Endurance & Intellect & Education & SocialStanding & Age & Psi

declare type StatDisplayHolder = Strength & Dexterity & Endurance & Intellect & Education & SocialStanding & Psi

declare type InjuryHolder = Strength & Dexterity & Endurance & Intellect & Education



