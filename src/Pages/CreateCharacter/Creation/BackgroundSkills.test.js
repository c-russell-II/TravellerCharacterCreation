import React from "react";
import { renderWithStatStore } from "../../../testing/test-utils";
import { BackgroundSkillsChoice } from "./BackgroundSkills";
import StatsSlice, { changeStat, startStats } from "../Character/StatsSlice";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, within } from "@testing-library/react";
import { act } from "react-dom/test-utils";

describe("Background Skills", () => {
	const statStore = configureStore(
		{ reducer: { stats: StatsSlice } },
		startStats
	);
	const backSkills = [
		"Admin",
		"Animals",
		"Athletics",
		"Art",
		"Carouse",
		"Drive",
		"Electronics",
		"Flyer",
		"Language",
		"Mechanic",
		"Medic",
		"Profession",
		"Science",
		"Seafarer",
		"Streetwise",
		"Survival",
		"VaccSuit",
	];
	test.each([
		[0, 0],
		[2, 1],
		[4, 2],
		[6, 3],
		[10, 4],
		[13, 5],
		[15, 6],
	])("Should limit your skills based on Edu", (val, lim) => {
		jest.spyOn(window, "alert").mockImplementation(() => {});
		const { store, getByText, getAllByRole, getByTestId } =
			renderWithStatStore(
				<MemoryRouter>
					<BackgroundSkillsChoice />
				</MemoryRouter>,
				{
					statStore,
				}
			);
		act(() => {
			store.dispatch(changeStat({ stat: "edu", value: val }));
		});
		expect(getByText(new RegExp(`Up to ${lim}`))).toBeTruthy();
		const boxArr = getAllByRole("checkbox");
		boxArr.forEach((e) => fireEvent.click(e));
		expect(window.alert).toHaveBeenCalledTimes(17 - lim);
		const selectedDiv = getByTestId("selected");
		const selectedSkills = backSkills.slice(0, lim);
		selectedSkills.forEach((e) => {
			expect(within(selectedDiv).getByText(e)).toBeTruthy();
		});
	});
	test("Should fire an alert if you've picked less than max skills", () => {
		jest.spyOn(window, "alert").mockImplementation(() => {});
		const { getByDisplayValue } = renderWithStatStore(
			<MemoryRouter>
				<BackgroundSkillsChoice />
			</MemoryRouter>,
			{
				statStore,
			}
		);
		const button = getByDisplayValue(/Confirm/);
		fireEvent.click(button);
		expect(window.alert).toHaveBeenCalledTimes(1);
	});
});
