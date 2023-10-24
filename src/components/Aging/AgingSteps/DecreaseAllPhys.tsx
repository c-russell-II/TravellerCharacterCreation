import { useDispatch } from "react-redux";
import { decreaseStat } from "../../../features/Character/StatsSlice";

export default function DecreaseAllPhys(props: {
	cleanup: () => void;
	value: 1 | 2;
}) {
	const dispatch = useDispatch();

	const decreaseAll = () => {
		dispatch(decreaseStat("str"));
		dispatch(decreaseStat("dex"));
		dispatch(decreaseStat("end"));
	};

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		decreaseAll();
		if (props.value === 2) {
			decreaseAll();
		}
	};
	return (
		<>
			<p>
				You're starting to feel the years - or maybe just the mileage -
				as every aspect of your body, physically, performs{" "}
				{props.value === 2 && "much"} worse than it once did -
				decreasing all physical stats by {props.value}.
			</p>
			<button onClick={handleClick}>Confirm</button>
		</>
	);
}
