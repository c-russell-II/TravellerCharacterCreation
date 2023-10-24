import React from "react";
import { useNavigate } from "react-router-dom";

export default function LandingPageTwo(props: any) {
	//A function using react router to navigate to /tcc
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/gen");
	};
	return (
		<>
			{/* Three divs, the central div is centered horizontally and vertically, the other two are on the sides */}
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					height: "100vh",
					backgroundColor: "darkslategray",
				}}
			>
				<div
					style={{
						flex: 1,
						height: "90vh",
						maxWidth: "25vw",
						borderTop: "55vh solid gray",
						borderLeft: "12vw solid transparent",
					}}
				></div>
				<div
					style={{
						flex: 1,
						backgroundColor: "lightgray",
						display: "flex",
						height: "100vh",
						alignItems: "center",
						justifyContent: "center",
					}}
					onClick={handleClick}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<h1 style={{ fontSize: "5rem" }}>TCC</h1>
						<h2 style={{ fontSize: "2rem" }}>
							Traveller Character Creator
						</h2>
					</div>
				</div>
				<div
					style={{
						flex: 1,
						maxWidth: "25vw",
						borderTop: "55vh solid gray",
						borderRight: "12vw solid transparent",
					}}
				></div>
			</div>
		</>
	);
}
