import { PropsWithChildren, useState } from "react";

interface CustomAccordianProps {
	stopProp: boolean;
	title: string;
	tier: 1 | 2 | 3 | 4 | 5 | 6;
}
export default function Accordian(
	props: PropsWithChildren<CustomAccordianProps>
) {
	const [isActive, setIsActive] = useState(false);
	const title = {
		1: (
			<h1>
				{props.title} {isActive ? "-" : "+"}
			</h1>
		),
		2: (
			<h2>
				{props.title} {isActive ? "-" : "+"}
			</h2>
		),
		3: (
			<h3>
				{props.title} {isActive ? "-" : "+"}
			</h3>
		),
		4: (
			<h4>
				{props.title} {isActive ? "-" : "+"}
			</h4>
		),
		5: (
			<h5>
				{props.title} {isActive ? "-" : "+"}
			</h5>
		),
		6: (
			<p>
				{props.title} {isActive ? "-" : "+"}
			</p>
		),
	};

	const handleInnerClick = (event: React.MouseEvent<HTMLDivElement>) => {
		if (props.stopProp) {
			event.stopPropagation();
		}
	};

	return (
		<div onClick={() => setIsActive((prev) => !prev)}>
			{title[props.tier]}{" "}
			{isActive && <div onClick={handleInnerClick}>{props.children}</div>}
		</div>
	);
}
