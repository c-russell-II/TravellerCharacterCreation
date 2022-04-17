import React, {useState} from "react";
import CareerTerm from "../Career/CareerTerm";
import { TermMidPoint } from "./TermMidPoint";

export const TermContainer = (props) => {
    const [ready, setReady] = useState(false);

    const cleanup = () => setReady(true);

    return (
        <div className="term">
            {ready ? <TermMidPoint/> : <CareerTerm cleanup={cleanup}/>}
        </div>
    )
}