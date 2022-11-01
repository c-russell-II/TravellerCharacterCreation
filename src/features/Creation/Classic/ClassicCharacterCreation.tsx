import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

type ClassicCCProps = {
	statArray: number[];
	availableStats: string[];
	clickHandler: (eventKey: string | null, num: number) => void;
	modifier: (number: number) => number;
};
export const ClassicCharacterCreation = (props: ClassicCCProps) => {
	const { statArray, availableStats, clickHandler, modifier } = props;

	return (
		<div>
			{statArray.map((e, i: number) => {
				return (
					<DropdownButton
						onSelect={(eventKey: string | null) =>
							clickHandler(eventKey, e)
						}
						title={`${e} (${modifier(statArray[i])})`}
						drop="end"
						size="sm"
						key={i}
						id={`Dropdown menu for roll with value ${e}`}
					>
						{availableStats.map((e, i) => {
							return (
								<Dropdown.Item key={i} value={e} eventKey={e}>
									{e}{" "}
								</Dropdown.Item>
							);
						})}
					</DropdownButton>
				);
			})}
		</div>
	);
};
