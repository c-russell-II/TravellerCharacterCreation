import React from "react";
import { skillCheck } from "../../Career/careerHandler";

const PsiEvent = (props) => {

    const psi = skillCheck();
    return (
        <>
            <p>You have had a psionic awakening! Please check with your GM if this is allowed in your game!</p>
            <p>If so, handle it with them personally!</p>
        </>
    )
}

export default PsiEvent;