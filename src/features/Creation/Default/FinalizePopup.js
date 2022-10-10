import Popup from "reactjs-popup";
import React from "react";


const FinalizePopup = (props) => {
     const {ready, handleFinalize, setReady} = props;

    return (
        <Popup
        open={ready}
        modal
        closeOnDocumentClick={false}
        >

            <h3>Finalize Stats?</h3>
            
            <p>When you move on to careers or higher education, any unspent points will be lost, and your stats will be finalized until you create a new character.</p>

            <button onClick={handleFinalize}>Let's continue.</button> <button onClick={() => {setReady(false)}}>Not Ready</button>

        </Popup>
    )
}

export default FinalizePopup;