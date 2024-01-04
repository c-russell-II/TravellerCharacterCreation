import { useDispatch } from "react-redux";
import { anagathicEnd } from "../../../features/Character/charaSlice";

export default function StopAnagathicOption() {
	const dispatch = useDispatch();

	const stopAnagathics = (event: React.SyntheticEvent<HTMLButtonElement>) => {
		event.preventDefault();
		dispatch(anagathicEnd());
	};

	return (
		<>
			<p>
				You are still taking anagathics each term, racking up 200,000 to
				1,200,000 credits in medical debt for each term you continue to
				take them. Would you like to stop?
			</p>
			<button onClick={stopAnagathics}>Stop Taking Anagathics</button>
		</>
	);
}
