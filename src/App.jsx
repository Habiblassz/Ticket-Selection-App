import React, { useState, useEffect } from "react";
import TicketSelection from "./TicketSelection";
import AttendeeDetails from "./AttendeeDetails";
import TicketGeneration from "./TicketGeneration";
import "./App.css";
import logo from "./assets/logo.png";

const App = () => {
	const [step, setStep] = useState(1);
	const [ticketDetails, setTicketDetails] = useState({
		type: "",
		quantity: 1,
		name: "",
		email: "",
		specialRequest: "",
		avatar: null, // Add avatar to the state
	});

	// Load data from local storage when the component mounts
	useEffect(() => {
		const savedData = localStorage.getItem("ticketDetails");
		if (savedData) {
			setTicketDetails(JSON.parse(savedData));
		} else {
			// Initialize with default values only if no data is saved
			setTicketDetails({
				type: "",
				quantity: 1,
				name: "",
				email: "",
				specialRequest: "",
				avatar: null,
			});
		}
	}, []);

	// Save data to local storage whenever it changes
	useEffect(() => {
		localStorage.setItem("ticketDetails", JSON.stringify(ticketDetails));
	}, [ticketDetails]);

	const handleNext = (data) => {
		setTicketDetails((prev) => ({ ...prev, ...data }));
		setStep(2);
	};

	const handleBack = () => {
		setStep(1);
	};

	const handleSubmit = (formData) => {
		setTicketDetails((prev) => ({
			...prev,
			name: formData.name,
			email: formData.email,
			specialRequest: formData.specialRequest,
			avatar: formData.avatar, // Update avatar in the state
		}));
		setStep(3);
	};

	const handleBookAnother = () => {
		setTicketDetails({
			type: "",
			quantity: 1,
			name: "",
			email: "",
			specialRequest: "",
			avatar: null, // Reset avatar
		});

		localStorage.removeItem("ticketDetails"); // Clear local storage
		setStep(1);
	};

	return (
		<>
			<div className="navbar">
				<div className="left">
					<img src={logo} alt="logo image" />
				</div>
				<div className="middle">
					<h2>Events</h2>
					<h2>My Tickets</h2>
					<h2>About Project</h2>
				</div>
				<div className="right">
					<button aria-label="View my ticket">My Ticket →</button>
				</div>
			</div>
			<div className="app">
				{step === 1 && <TicketSelection onNext={handleNext} />}
				{step === 2 && (
					<AttendeeDetails
						onBack={handleBack}
						onSubmit={handleSubmit}
						ticketQuantity={ticketDetails.quantity}
						initialData={{
							name: ticketDetails.name,
							email: ticketDetails.email,
							project: ticketDetails.specialRequest,
							avatar: ticketDetails.avatar,
						}}
					/>
				)}
				{step === 3 && (
					<TicketGeneration
						ticketDetails={ticketDetails}
						onBookAnother={handleBookAnother}
						ticketQuantity={ticketDetails.quantity}
					/>
				)}
			</div>
		</>
	);
};

export default App;
