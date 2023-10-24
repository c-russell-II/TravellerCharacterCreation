import { AnyRankBonus, RankSkillBonus, RankSkillChoiceBonus } from "../../../features/CareerDetails/CareerTypes/TermAndRankRewardTypes";
import SetStatBonus from "./BonusHandlers/SetStatBonus";
import SingleSkillBonus from "./BonusHandlers/SingleSkillBonus";
import SkillChoiceBonus from "./BonusHandlers/SkillChoiceBonus";
import StatBonus from "./BonusHandlers/StatBonus";


export default function RankUpBonusSwitchboard (props: {cleanup: () => void, bonus: AnyRankBonus}) {
    switch (props.bonus.type) {
        case 'stat':
            return <StatBonus bonus={props.bonus} cleanup={props.cleanup}/>
        case 'skill':
            if (props.bonus.skill !== 'choice') {
                return <SingleSkillBonus bonus={props.bonus as RankSkillBonus} cleanup={props.cleanup}/>
            } else {
                return <SkillChoiceBonus bonus={props.bonus as RankSkillChoiceBonus} cleanup={props.cleanup}/>
            }
        case 'setStat':
            return <SetStatBonus bonus={props.bonus} cleanup={props.cleanup}/>
        default:
            console.warn("Unhandled bonus type in RankUpBonusSwitchboard!")
            console.table(props.bonus);
            return <p>didn't mean for you to see this. should be an error message in the console, if you're bug testing this.</p>
    }
}