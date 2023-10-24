import React, { useState } from "react";
import Offcanvas from 'react-bootstrap/Offcanvas'
import Button from 'react-bootstrap/Button'
import { useSelector } from "react-redux";
import { CharacterSidebar } from "../../CharacterSidebar/CharacterSidebar";
import styles from './Organization.module.css';
import { RootState } from "../../../app/store";

const SidebarController = () => {
    const name = useSelector((state: RootState) => state.chara.charaName);
    const [show, setShow] = useState(false);

    const handleClose= () => setShow(false);
    const toggleShow = () => setShow((prev) => !prev)
    return (
        <>
            <Button variant="info" size="lg" onClick={toggleShow} className={styles.button_Lg}>Open Character Sheet</Button>
            <Offcanvas show={show} onHide={handleClose} scroll={true} backdrop="true" placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{name}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body >
                    <CharacterSidebar/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default SidebarController;