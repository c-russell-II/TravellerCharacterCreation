import { useDispatch, useSelector } from "react-redux";
import { skillCheck } from "../../../features/Career/careerHandler";
import { ageUp } from "../../../features/Character/StatsSlice";
import { resolveTerm } from "../../../features/TermSlice/TermSlice";
import { useNavigate } from "react-router-dom";
import { anagathicsTerm } from "../../../features/Character/charaSlice";
import { RootState } from "../../../app/store";

export default function BeginAnagathicChoice() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const soc = useSelector((state: RootState) => state.stats.soc);

	const anagathicCheck = (event: React.SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const rollVal = skillCheck();
		if (rollVal === 2) {
			alert(
				"You were caught, and jailed, attempting to get highly illegal anagathics!"
			);
			dispatch(ageUp());
			dispatch(resolveTerm());
			navigate("/prisoner/");
		}
		if (rollVal + soc >= 10) {
			dispatch(anagathicsTerm());
		}
	};
	//TODO: Add a failure case for the roll - as it is, it just... vanishes? or lets you keep rolling until success

	return (
		<>
			<p>
				As you get older, the effects of ageing may catch up to you.
				Would you like to attempt to acquire (highly illegal) anagathic
				treatments? It can cost anywhere from 200,000 to 1,200,000
				credits each term.
			</p>
			<button onClick={anagathicCheck}>Acquire Anagathics</button>
		</>
	);
}
