import React from "react";
import SingleStat from "./SingleStat";
import { render, fireEvent } from "@testing-library/react";

describe("Single Stats", () => {
	test("Should pass value increase, and display new value", () => {
		let val = 0;
		const increase = jest.fn(() => {
			val++;
		});
		const { getByText, container } = render(
			<SingleStat
				stat="test"
				val={val}
				increase={increase}
				decrease={() => {}}
				modVal="0"
				cost="0"
			/>
		);
		fireEvent.click(getByText(/\+/));
		expect(increase).toHaveBeenCalledTimes(1);
		const valueField =
			container.querySelector("#testcontroller").textContent;
		expect(valueField).toMatch(/Test: 1 || Mod: 0/);
		expect(val).toEqual(1);
	});

	test("Should pass value decrease, and display new value", () => {
		let val = 1;
		const decrease = jest.fn(() => {
			val--;
		});
		const { getByText, container } = render(
			<SingleStat
				stat="test"
				val={val}
				increase={() => {}}
				decrease={decrease}
				modVal="0"
				cost="0"
			/>
		);
		fireEvent.click(getByText(/-/));
		expect(decrease).toHaveBeenCalledTimes(1);
		const valueField =
			container.querySelector("#testcontroller").textContent;
		expect(valueField).toMatch(/Test: 0 || Mod: 0/);
		expect(val).toEqual(0);
	});
});