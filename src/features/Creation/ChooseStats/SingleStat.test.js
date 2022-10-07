import React from "react";
import SingleStat from "./SingleStat";
import { render, fireEvent } from "@testing-library/react";

test("Should pass value increase, and display new value", () => {
	let val = 0;
	const increase = jest.fn(() => {
		val++;
	});
	const { getByText } = render(
		<SingleStat
			stat="test"
			val={val}
			increase={increase}
			decrease={() => {}}
			modVal="0"
			cost="0"
			id="test"
		/>
	);
	fireEvent.click(getByText(/+/i));
	expect(increase).toHaveBeenCalledTimes(1);
	const valueField = document.getElementsById("test");
	expect(valueField).toMatch(/Test: 1 || Mod: 0/);
});
