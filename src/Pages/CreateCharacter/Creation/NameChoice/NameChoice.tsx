import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setName } from "../../../../features/Character/charaSlice";
import styles from "./styles.module.css";

//TODO: Handle testing NameChoice for chara creation!
const NameChoice = () => {
	const dispatch = useDispatch();
	const [value, setValue] = useState("John Smith");

	const handleSubmit = (event: React.SyntheticEvent) => {
		dispatch(setName(value));
	};
	const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
		event.preventDefault();
		if (typeof event.currentTarget.value === "string") {
			setValue(event.currentTarget.value);
		}
		console.error("Name Submit Handle Change passed an invalid event");
	};

	return (
		<form onSubmit={handleSubmit} className={styles.nameChoice}>
			<input
				className={styles.nameInput}
				type="text"
				onChange={handleChange}
				value={value}
				placeholder="name"
			/>

			<input className={styles.nameSubmit} type="submit" value="Submit" />
		</form>
	);
};

export default NameChoice;
