import { PropsWithChildren, useState } from "react";
import MinorPhysDecrease from "./MinorPhysDecrease";

export default function MultiStepContainer (props: {cleanup: () => void, bad: boolean}) {
    const [isTwoReady, setIsTwoReady] = useState(false);
    const [isOneReady, setIsOneReady] = useState(false);

    const numOne = props.bad ? 1 : 2;
    const numTwo = props.bad ? 2 : 1;

    const handleTwoCleanup = () => {
        setIsTwoReady(true);
        if (isOneReady) {
            props.cleanup();
            return;
        }
    }
    const handleOneCleanup = () => {
        setIsOneReady(true);
        if (isTwoReady) {
            props.cleanup();
            return;
        }
    }
    return (
		<>
			{!isOneReady && <MinorPhysDecrease num={numOne} cleanup={handleOneCleanup} value={1}/> }
			{!isTwoReady && <MinorPhysDecrease num={numTwo} cleanup={handleTwoCleanup} value={2}/> }
		</>
	);
}