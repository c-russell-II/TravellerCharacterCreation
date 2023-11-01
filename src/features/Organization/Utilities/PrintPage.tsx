import React, { useRef } from "react";
import  { useReactToPrint } from "react-to-print";
import CharacterSheet from "./CharacterSheet";

const PrintPage = () => {
    const componentRef = useRef<HTMLDivElement>(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current
    });
    return (
        <div>
            <button onClick={handlePrint}>Print</button>
            <CharacterSheet ref={componentRef}/>
        </div>
    )
}

export default PrintPage