// TicketSelection.jsx
import React, { useState } from "react";
import "./TicketSelection.css";

const TicketSelection = ({ onNext }) => {
	const [ticketType, setTicketType] = useState(null);
	const [numTickets, setNumTickets] = useState(1);

	const handleNext = () => {
		if (ticketType) {
			onNext({ type: ticketType, quantity: numTickets });
		}
	};

	const ticketOptions = [
		{ type: "REGULAR", price: 0, label: "REGULAR ACCESS", availability: 20 },
		{ type: "VIP", price: 50, label: "VIP ACCESS", availability: 20 },
		{ type: "VVIP", price: 150, label: "VVIP ACCESS", availability: 20 },
	];

	return (
		<div className="ticket-selection">
			<div className="ticket-container">
				<div className="header">
					<div className="flex-header">
						<h1 className="title">Ticket Selection</h1>
						<span className="step">Step 1/3</span>
					</div>
					<div className="progress-bar"></div>
				</div>
				<p className="event-info">
					Join us for an unforgettable experience at [Event Name]. Secure your
					spot now.
				</p>
				<p className="location-date">
					<span className="location">↑ [Event Location]</span> || March 15, 2025
					| 7:00 PM
				</p>

				<div className="select-ticket">
					<p className="ticket-type-title">Select Ticket Type:</p>
					<div className="ticket-options">
						{ticketOptions.map((option) => (
							<button
								key={option.type}
								className={`ticket-option ${
									ticketType === option.type ? "selected" : ""
								}`}
								onClick={() => setTicketType(option.type)}>
								<div className="ticket-label">{option.label}</div>
								<div className="ticket-price">
									{option.price === 0 ? "Free" : `$${option.price}`}
								</div>
								<div className="ticket-availability">
									{option.availability} left!
								</div>
							</button>
						))}
					</div>

					<div className="num-tickets">
						<label htmlFor="numTickets">Number of Tickets</label>
						<select
							id="numTickets"
							value={numTickets}
							onChange={(e) => setNumTickets(parseInt(e.target.value, 10))}>
							{[...Array(10)].map((_, i) => (
								<option key={i + 1} value={i + 1}>
									{i + 1}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="buttons">
					<button className="cancel-button">Cancel</button>
					<button
						className="next-button"
						onClick={handleNext}
						disabled={!ticketType}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default TicketSelection;
