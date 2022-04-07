import React from "react";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';
import { useSelector } from "react-redux";

export const GraduationDialogue = (props) => {

    const continueClick = (event) => {
        return;
    }
    const graduateClick = (event) => {
        return;
    }
    return (
    <Popup
        defaultOpen
        modal
    >
        <h5>You made it through this term!</h5>
        <p>Would you like to continue for another term, or go for graduation now?</p>
        <button>Another term!</button>   <button>To Careers!</button>
    </Popup>)
}