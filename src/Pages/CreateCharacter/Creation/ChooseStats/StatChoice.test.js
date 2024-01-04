import React from "react";
import { render, fireEvent } from "@testing-library/react";
import StatChoice from "./StatChoice";
describe("Stat Choice", () => {
	test("Clicking Ready with <6 points should fire setReady", () => {
		let points = 5;
		const stats = { str: 7, dex: 7, end: 7, int: 7, edu: 7, soc: 7 };
		const setReady = jest.fn();
		const { getByText } = render(
			<StatChoice points={points} setReady={setReady} stats={stats} />
		);
		const button = getByText("Finalize stats.");
		while (points >= 0) {
			fireEvent.click(button);
			points--;
		}
		expect(setReady).toHaveBeenCalledTimes(6);
	});

	test("Clicking Ready with >5 points should alert", () => {
		let points = 6;
		const stats = { test: 7 };
		const setReady = jest.fn();
		jest.spyOn(window, "alert").mockImplementation(() => {});
		const { getByText } = render(
			<StatChoice points={points} setReady={setReady} stats={stats} />
		);
		const button = getByText("Finalize stats.");
		while (points < 25) {
			fireEvent.click(button);
			points++;
		}
		expect(setReady).toHaveBeenCalledTimes(0);
		expect(window.alert).toHaveBeenCalledTimes(19);
	});

	test("Clicking Increase with 0 points should fire an alert", () => {
		let points = 0;
		const stats = { test1: 1, test3: 3, test5: 5 };
		jest.spyOn(window, "alert").mockImplementation(() => {});
		const { getAllByText } = render(
			<StatChoice points={points} stats={stats} />
		);
		const button = getAllByText(/\+/);
		button.forEach((e) => {
			fireEvent.click(e);
		});
		expect(window.alert).toHaveBeenCalledTimes(button.length);
	});

	test("Clicking Decrease when the stat is at one should fire an alert", () => {
		let points = 0;
		const stats = { test1: 1 };
		const setPoints = jest.fn();
		jest.spyOn(window, "alert").mockImplementation(() => {});
		const { getAllByText } = render(
			<StatChoice points={points} stats={stats} setPoints={setPoints} />
		);
		const button = getAllByText("-");
		button.forEach((e) => {
			fireEvent.click(e);
		});
		expect(window.alert).toHaveBeenCalledTimes(button.length);
	});

	test("Decreasing a stat should adjust passed points!", () => {
		let points = 0;
		let stats = {
			test: 2,
			test5: 5,
			test8: 8,
			test11: 11,
			test13: 13,
			test15: 16,
		};
		const setPoints = jest.fn((func) => {
			points = func(points);
		});
		const setStats = jest.fn((func) => {
			stats = func(stats);
		});
		const { getAllByText } = render(
			<StatChoice
				points={points}
				stats={stats}
				setStats={setStats}
				setPoints={setPoints}
			/>
		);
		const button = getAllByText("-");
		button.forEach((e) => {
			fireEvent.click(e);
		});
		expect(points).toBe(21);
		const changedStats = {
			test: 1,
			test5: 4,
			test8: 7,
			test11: 10,
			test13: 12,
			test15: 15,
		};
		expect(stats).toEqual(changedStats);
	});

	test("Stat increases should cost points!", () => {
		let points = 15;
		let stats = {
			test2: 2,
			test5: 5,
			test7: 7,
			test11: 11,
			test13: 13,
		};
		const setPoints = jest.fn((func) => {
			points = func(points);
		});
		const setStats = jest.fn((func) => {
			stats = func(stats);
		});
		const { getAllByText } = render(
			<StatChoice
				points={points}
				stats={stats}
				setPoints={setPoints}
				setStats={setStats}
			/>
		);
		const buttonArr = getAllByText(/\+/);
		buttonArr.forEach((e) => {
			fireEvent.click(e);
		});
		expect(stats).toEqual({
			test2: 3,
			test5: 6,
			test7: 8,
			test11: 12,
			test13: 14,
		});
		expect(points).toBe(0);
	});
});
