import { Dropdown, SplitButton } from "react-bootstrap";
import { AnyTermReward } from "../../../features/CareerDetails/CareerTyping";

export default function SingleTable(props: {
	table: AnyTermReward[];
	title: string;
	cleanup: (arg0: AnyTermReward) => void;
}) {
	const handleClick = () => {
		const reward =
			props.table[Math.floor(Math.random() * props.table.length)];
		props.cleanup(reward);
	};
	const extractInfo = (item: AnyTermReward) => {
		if (item.type === "skill") {
			return item.skill;
		} else if (item.type === "stat") {
			return item.stat;
		} else if (item.type === "choice") {
			return item.list.join(" or ");
		} else {
			return;
		}
	};
	return (
		<>
			<SplitButton
				id={`skill dropdown menu for ${props.title}`}
				variant="info"
				title={props.title}
				size="lg"
				onClick={() => handleClick()}
				autoClose={false}
			>
				{props.table.map((e: AnyTermReward, i: number) => (
					<Dropdown.Item
						eventKey={e.type}
						key={`dropdown item at index ${i}`}
					>
						{extractInfo(e)}
					</Dropdown.Item>
				))}
			</SplitButton>
		</>
	);
}
