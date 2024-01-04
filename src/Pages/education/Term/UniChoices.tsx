import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { skillCheck } from "../../../features/Career/careerHandler";
import { chooseSchool } from "../../../features/education/EducationSlice";
import styles from "./styles.module.css";
import { RootState } from "../../../app/store";

interface UniChoicesProps {
	setUniPass: (arg0: boolean) => any;
	setChoiceButtons: (arg0: boolean) => any;
	getCareerModifier: (arg0?: boolean) => number;
	setToCareers: (arg0: boolean) => any;
	setMilAcademyLink: (arg0: boolean) => any;
}
const UniChoices = (props: UniChoicesProps) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const stats = useSelector((state: RootState) => state.stats);

	const {
		setUniPass,
		setChoiceButtons,
		getCareerModifier,
		setToCareers,
		setMilAcademyLink,
	} = props;
	const uniEnroll = () => {
		const result = 8 <= skillCheck(stats.edu) - getCareerModifier();
		if (result) {
			setUniPass(true);
			setChoiceButtons(false);
			dispatch(chooseSchool({ school: "University", age: stats.age }));
			return;
		}
		setChoiceButtons(false);
		setToCareers(true);
		return;
	};
	const milAcademyEnroll = () => {
		setMilAcademyLink(true);
		setChoiceButtons(false);
		return;
	};

	return (
		<div className={styles.buttonContainer}>
			<button className={styles.choiceButton} onClick={uniEnroll}>
				University
			</button>
			<button onClick={milAcademyEnroll} className={styles.choiceButton}>
				Military Academy
			</button>
			<button
				onClick={() => {
					navigate("/choose_career");
				}}
				className={styles.choiceButton}
			>
				{" "}
				Straight to Careers
			</button>
		</div>
	);
};

export default UniChoices;
