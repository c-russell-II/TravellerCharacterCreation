import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { skillCheck } from "../../Career/careerHandler";
import { chooseSchool } from "../Utilities/EducationSlice";
import styles from './styles.module.css';
import { RootState } from "../../../app/store";

interface BranchChoiceProps {
    getCareerModifier: (arg0?: boolean) => number;
    setMilAcademy: (arg0: {pass: boolean, branch: 'army' | 'navy' | 'marine' | 'scout'}) => any;
    setMilAcademyLink: (arg0: boolean) => any;
    milAcademyLink: boolean;
    setToCareers: (arg0: boolean) => any;
}
const BranchChoice = (props: BranchChoiceProps) => {
    const {
        getCareerModifier,
        setMilAcademy,
        setMilAcademyLink,
        milAcademyLink,
        setToCareers
    } = props;
    const dispatch = useDispatch();
    const stats = useSelector((state: RootState) => state.stats);
    

    const armyEnroll = () => {
        const result = 8 <= skillCheck(stats.end) - getCareerModifier(true);
        if (result) {
            setMilAcademy({pass: true, branch: 'army'});
            dispatch(chooseSchool({school: 'army', age: stats.age}))
            setMilAcademyLink(false);
            return;
        }
        setToCareers(true);
        return;
    }
    
    const navyEnroll = () => {
        const result = 9 <= skillCheck(stats.int) - getCareerModifier(true);
        if (result) {
            setMilAcademy({pass: true, branch: 'navy'});
            dispatch(chooseSchool({school: 'navy', age: stats.age}))
            setMilAcademyLink(false);
            return;
        }
        setToCareers(true);
        return;
    }
    const marinesEnroll = () => {
        const result = 9 <= skillCheck(stats.end) - getCareerModifier(true);
        if (result) {
            setMilAcademy({pass: true, branch: 'marine'});
            dispatch(chooseSchool({school: 'marine', age: stats.age}))
            setMilAcademyLink(false);
            return;
        }
        setToCareers(true);
        return;
    }

    return (
        <Popup
            open={milAcademyLink}
            modal
        >
            <div className={styles.branchPopup}>
            <p className={styles.popupText}>Which branch's military academy would you like to enroll in?</p>
            <div className={styles.buttonContainer}>
                <button className={styles.choiceButton} onClick={armyEnroll}>Army</button>
                <button className={styles.choiceButton} onClick={navyEnroll}>Navy</button>
                <button className={styles.choiceButton} onClick={marinesEnroll}>Marines</button>
            </div>
            </div>
        </Popup>
    )
}

export default BranchChoice;