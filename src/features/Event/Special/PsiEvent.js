import React from "react";
import { useDispatch } from "react-redux";
import { skillCheck } from "../../Career/careerHandler";
import { addPsi } from "../../Character/StatsSlice";

const PsiEvent = (props) => {
    const dispatch = useDispatch();

    const psi = skillCheck();
    dispatch(addPsi(psi))
    return (
        <>
            <p>You have had a psionic awakening! Please check with your GM if this is allowed in your game!</p>
            <p>If so, handle it with them personally!</p>
        </>
    )
}

export default PsiEvent;