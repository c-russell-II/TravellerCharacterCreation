declare module "*.module.css" {
	const classes: { [key: string]: string };
	export default classes;
}
declare interface Strength {
	[str: string]: number;
}
declare interface Dexterity {
    [dex: string]: number
}
declare interface Endurance {
    [end: string]: number
}
declare interface Intellect {
    [int: string]: number
}
declare interface Education {
    [edu: string]: number
}
declare interface SocialStanding {
    [soc: string]: number
}
declare interface Age {
    [age: string]: number
}
declare interface Psi {
    [psi: string]: number
}
declare type CharaStats = Strength & Dexterity & Endurance & Intellect & Education & SocialStanding & Age & Psi

declare type StatDisplayHolder = Strength & Dexterity & Endurance & Intellect & Education & SocialStanding & Psi

declare type InjuryHolder = Strength & Dexterity & Endurance & Intellect & Education



