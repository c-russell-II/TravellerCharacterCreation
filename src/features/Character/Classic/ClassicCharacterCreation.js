import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
export const ClassicCharacterCreation = (props) => {
    const {statArray, availableStats, clickHandler, modifier} = props;

    return (
        <div>
            {statArray.map((e, i) => {
                return (
                    <DropdownButton onSelect={(eventKey) => clickHandler(eventKey, e)} title={`${e} (${modifier(statArray[i])})`} drop='end' size="sm" key={i} id={`Dropdown menu for roll with value ${e}`}>
                        {availableStats.map((e, i) => { return (<Dropdown.Item key={i} value={e} eventKey={e}>{e} </Dropdown.Item>)})}
                    </DropdownButton>
                )
            })}
        </div>
    )
}