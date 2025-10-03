import { useState, useEffect } from "react";
import "./TicketSelection.css";

const TicketSelection = ({ onNext }) => {
	const [ticketType, setTicketType] = useState(null);
	const [numTickets, setNumTickets] = useState(1);
	const [ticketAvailability, setTicketAvailability] = useState({
		REGULAR: 20,
		VIP: 10,
		VVIP: 5,
	});

	useEffect(() => {
		const savedData = localStorage.getItem("ticketDetails");
		if (savedData) {
			const { type, quantity } = JSON.parse(savedData);
			setTicketType(type);
			setNumTickets(quantity);
		}
	}, []);

	const handleNext = () => {
		if (ticketType) {
			// Update availability
			const newAvailability = { ...ticketAvailability };
			newAvailability[ticketType] = Math.max(
				0,
				newAvailability[ticketType] - numTickets
			);
			setTicketAvailability(newAvailability);

			onNext({ type: ticketType, quantity: numTickets });
		}
	};

	const getMaxTicketsForType = (type) => {
		return Math.min(ticketAvailability[type], 10);
	};

	const ticketOptions = [
		{
			type: "REGULAR",
			price: 0,
			label: "REGULAR ACCESS",
			availability: ticketAvailability.REGULAR,
			features: ["Event Access", "Basic Seating", "Event Swag"],
		},
		{
			type: "VIP",
			price: 150,
			label: "VIP ACCESS",
			availability: ticketAvailability.VIP,
			features: [
				"Priority Entry",
				"VIP Lounge",
				"Meet & Greet",
				"Premium Swag",
			],
		},
		{
			type: "VVIP",
			price: 300,
			label: "VVIP ACCESS",
			availability: ticketAvailability.VVIP,
			features: [
				"VVIP Entry",
				"Backstage Access",
				"Photo Ops",
				"Exclusive Merch",
			],
		},
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

				<div className="event-block">
					<h2 className="event-title">Techember Fest '25</h2>
					<p className="event-info">
						Join us for an unforgettable experience featuring top speakers,
						workshops, and networking opportunities.
					</p>
					<p className="location-date">
						<span className="location">📍 04 Rumens Road, Lagos</span> | March
						15, 2025 | 17:00 PM
					</p>
				</div>

				<div className="horizontal-line"></div>

				<div className="select-ticket">
					<p className="ticket-type-title">Select Ticket Type:</p>
					<div className="ticket-options">
						{ticketOptions.map((option) => (
							<button
								key={option.type}
								className={`ticket-option ${
									ticketType === option.type ? "selected" : ""
								} ${option.availability === 0 ? "sold-out" : ""}`}
								onClick={() =>
									option.availability > 0 && setTicketType(option.type)
								}
								disabled={option.availability === 0}
								aria-label={`Select ${option.label} ticket - ${option.availability} available`}>
								{option.availability === 0 && (
									<div className="sold-out-badge">Sold Out</div>
								)}
								<div className="ticket-details">
									<div className="ticket-price">
										{option.price === 0 ? "Free" : `$${option.price}`}
									</div>
									<div className="ticket-label">{option.label}</div>
									<div className="ticket-availability">
										{option.availability}/20 available
									</div>
									<div className="ticket-features">
										{option.features.map((feature, index) => (
											<span key={index} className="feature">
												• {feature}
											</span>
										))}
									</div>
								</div>
							</button>
						))}
					</div>

					{ticketType && (
						<div className="num-tickets">
							<label htmlFor="numTickets">
								Number of Tickets (Max: {getMaxTicketsForType(ticketType)})
							</label>
							<select
								id="numTickets"
								value={numTickets}
								onChange={(e) => setNumTickets(parseInt(e.target.value, 10))}>
								{[...Array(getMaxTicketsForType(ticketType))].map((_, i) => (
									<option key={i + 1} value={i + 1}>
										{i + 1}
									</option>
								))}
							</select>
						</div>
					)}

					{ticketType && (
						<div className="order-summary">
							<h4>Order Summary</h4>
							<div className="summary-line">
								<span>
									{ticketType} Ticket × {numTickets}
								</span>
								<span>
									{ticketOptions.find((t) => t.type === ticketType).price === 0
										? "Free"
										: `$${
												ticketOptions.find((t) => t.type === ticketType).price *
												numTickets
										  }`}
								</span>
							</div>
						</div>
					)}
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
