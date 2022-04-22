import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { roll } from "../../Career/careerHandler";
import { addContact } from "../../Character/miscBonusSlice";
import { resolveEvent } from "../../Term/TermSlice";

const Contact = (props) => {
    const {isMultiple} = props;
    const event = useSelector(state => state.term.event);
    const dispatch = useDispatch();

    let value = isMultiple? event.result.contact.value : event.result.value
    const description = isMultiple ? event.result.contact.description : event.result.description;

    const handleClick = (ev) => {
        ev.preventDefault();
        if (value === 'roll') {
            const num = isMultiple ? event.result.contact.roll : event.result.roll
            value = roll(num + 1);
        }
        dispatch(addContact({value: value, description: description}))

        if (!isMultiple) {
            dispatch(resolveEvent())
        }
        return;
    }
    return (
        <>
            <button onClick={handleClick}>Great!</button>
        </>
    )
}

export default Contact;