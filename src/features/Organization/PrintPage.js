import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import CharacterSheet from "./CharacterSheet";

const PrintPage = (props) => {
    const componentRef = useRef();

    return (
        <div>
            <ReactToPrint
                trigger={() => <button>Print!</button>}
                content={() => componentRef.current}
            />
            <CharacterSheet ref={componentRef}/>
        </div>
    )
}

export default PrintPage