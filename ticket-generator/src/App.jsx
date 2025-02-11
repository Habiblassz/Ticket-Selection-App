import React, { useState } from "react";
import TicketSelection from "./TicketSelection";
import AttendeeDetails from "./AttendeeDetails";
import TicketGeneration from "./TicketGeneration";

const App = () => {
	const [step, setStep] = useState(1);
	const [ticketDetails, setTicketDetails] = useState({
		type: "",
		quantity: 1,
		name: "",
		email: "",
		specialRequest: "",
	});

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
			name: formData.get("name"),
			email: formData.get("email"),
			specialRequest: formData.get("project"),
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
		});
		setStep(1);
	};

	return (
		<div className="app">
			{step === 1 && <TicketSelection onNext={handleNext} />}
			{step === 2 && (
				<AttendeeDetails
					onBack={handleBack}
					onSubmit={handleSubmit}
					ticketQuantity={ticketDetails.quantity}
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
	);
};

export default App;
