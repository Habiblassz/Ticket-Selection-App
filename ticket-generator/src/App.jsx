import React, { useState } from "react";
import TicketSelection from "./TicketSelection";
import AttendeeDetails from "./AttendeeDetails";
import TicketGeneration from "./TicketGeneration";
import "./App.css";

const App = () => {
	const [step, setStep] = useState(1);
	const [ticketType, setTicketType] = useState("");
	const [ticketDetails, setTicketDetails] = useState(null);

	const handleNextStep = (type) => {
		setTicketType(type);
		setStep(2);
	};

	const handleBack = () => {
		setStep(1);
	};

	const handleSubmitDetails = (details) => {
		setTicketDetails(details);
		setStep(3);
	};

	const handleBookAnother = () => {
		setStep(1);
		setTicketDetails(null);
	};

	return (
		<div className="app">
			{step === 1 && <TicketSelection onNext={handleNextStep} />}
			{step === 2 && (
				<AttendeeDetails onBack={handleBack} onSubmit={handleSubmitDetails} />
			)}
			{step === 3 && (
				<TicketGeneration
					ticketDetails={ticketDetails}
					onBookAnother={handleBookAnother}
				/>
			)}
		</div>
	);
};

export default App;
