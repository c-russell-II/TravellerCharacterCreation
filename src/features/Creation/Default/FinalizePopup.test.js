import { fireEvent, render } from "@testing-library/react";
import React from "react";
import FinalizePopup from "./FinalizePopup";

describe("Finalize Popup", () => {
    it("Should set ready to false if you click not ready", () => {
        let ready = true;
        const setReady = jest.fn((pass) => {ready = pass}); 
        const {getByText} = render(<FinalizePopup ready={ready} setReady={setReady}/>)
        const button = getByText(/Not/);
        fireEvent.click(button);
        expect(setReady).toHaveBeenCalledTimes(1);
        expect(ready).toBe(false);
    })
})