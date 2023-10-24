import { useState } from "react";
import { useDispatch } from "react-redux";
import { decreaseStat } from "../../../features/Character/StatsSlice";

//TODO: fill in unit tests
export default function MinorPhysDecrease (props: {num: 1 | 2, cleanup: () => void, value: 1 | 2}) {
    const [strChecked, setStrChecked] = useState(false);
    const [dexChecked, setDexChecked] = useState(false);
    const [endChecked, setEndChecked] = useState(false);
    const dispatch = useDispatch();
    const inputType = props.num === 1 ? 'radio' : 'checkbox';
    const getNumChecked = () => {
        let returnVal = 0;
        if (strChecked) returnVal++;
        if (dexChecked) returnVal++;
        if (endChecked) returnVal++;
        return returnVal;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (strChecked) {
            dispatch(decreaseStat("str"));
            setStrChecked(false);
        }
        if (dexChecked) {
            dispatch(decreaseStat("dex"));
            setDexChecked(false);
        }
        if (endChecked) {
            dispatch(decreaseStat("end"))
            setEndChecked(false);
        }
        props.cleanup();
    }
    const handleStrChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (strChecked) {
            setStrChecked(false);
            return;
        }
        if (props.num === 1) {
            setDexChecked(false);
            setEndChecked(false);
            setStrChecked(true);
            return;
        }
        const currNum = getNumChecked();
        if (currNum >= props.num) {
            //TODO: custom modal instead of annoying alert
            //TODO: Logic for unchecking a box when you try to select a new one? never sure which pattern is better, look up common patterns for this, and when to use it
            alert("Too many stats selected! Deselect another option first.")
            return;
        }
        setStrChecked(true);
    }
    const handleDexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (dexChecked) {
            setDexChecked(false);
            return;
        }
        if (props.num === 1) {
            setEndChecked(false);
            setStrChecked(false);
            setDexChecked(true);
            return;
        }
        const currNum = getNumChecked();
        if (currNum >= props.num) {
            //TODO: another alert here :')
            alert("Too many stats selected! Deselect another option first.")
            return;
        }
        setDexChecked(true);
    }
    const handleEndChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (endChecked) {
            setEndChecked(false);
            return;
        }
        if (props.num === 1) {
            setStrChecked(false);
            setDexChecked(false);
            setEndChecked(true);
            return;
        }
        const currNum = getNumChecked();
        if (currNum >= props.num) {
            alert("Too many stats selected! Deselect another option first.");
            return;
        }
        setEndChecked(true);
    }
    return (
		<>
        <p>Select {props.num} stats to be decreased by {props.value}</p>
			<form name="minorPhys" onSubmit={handleSubmit}>
				<label htmlFor="strDec">Strength</label>
				<input
					id="strDec"
					name="minorPhys"
					onChange={handleStrChange}
					type={inputType}
					checked={strChecked}
				/>
				<label htmlFor="dexDec">Dexterity</label>
				<input
					id="dexDec"
					name="minorPhys"
					onChange={handleDexChange}
					type={inputType}
					checked={dexChecked}
				/>
				<label htmlFor="endDec">Endurance</label>
				<input
					id="endDec"
					name="minorPhys"
					onChange={handleEndChange}
					type={inputType}
					checked={endChecked}
				/>
				<button type="submit" />
			</form>
		</>
	);
}