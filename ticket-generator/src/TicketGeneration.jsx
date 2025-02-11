import React from "react";
import "./TicketGeneration.css";
import QRCode from "react-qr-code";

const TicketGeneration = ({ ticketDetails, onBookAnother, ticketQuantity }) => {
	const downloadTicket = () => {
		const ticketContent = `
            Techember Fest "25
            User Name: ${ticketDetails.name}
            Ticket Type: ${ticketDetails.type}
            ${ticketDetails.extraInfo ? ticketDetails.extraInfo : ""}
            ↑ 04 Rumens road, Ikoyi, Lagos
            March 15, 2025 | 7:00 PM
        `;

		const blob = new Blob([ticketContent], { type: "text/plain" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "ticket.txt";
		a.style.display = "none";
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
		document.body.removeChild(a);
	};

	return (
		<div className="ticket-generation">
			<div className="generation-container">
				<div className="header">
					<div className="flex-header">
						<h2 className="title">Ready</h2>
						<span className="step">Step 3/3</span>
					</div>
					<div className="progress-bar"></div>
				</div>

				<div className="content">
					<h2>Your Ticket is Booked!</h2>
					<p className="download-info">
						Check your email for a copy or you can download
					</p>

					<div className="ticket">
						<div className="qr-code">
							<QRCode
								value={`${ticketDetails.name} - ${ticketDetails.type} - ${ticketDetails.email} - ${ticketQuantity}`}
								size={100}
							/>
						</div>
						<div className="ticket-details">
							<div className="event-title">Techember Fest "25</div>
							<div className="location-date">
								<p className="location">04 Rumens road, Novi, Lagos</p>
								<p className="date-time">March 15, 2025 | 17:00 PM</p>
							</div>
							<div className="user-info">
								<p className="user-name">{ticketDetails.name}</p>
								<p className="user-email">{ticketDetails.email}</p>
							</div>
							<div className="ticket-type-info">
								<p className="ticket-type">{ticketDetails.type}</p>
								<p className="ticket-for">Ticket for: {ticketQuantity}</p>
							</div>
							<div className="special-request">
								<p className="request-label">Special request?</p>
								<p className="request-text">
									{ticketDetails.specialRequest || "Nil"}
								</p>
							</div>
						</div>
					</div>

					<div className="buttons">
						<button className="book-another-button" onClick={onBookAnother}>
							Book Another Ticket
						</button>
						<button className="download-button" onClick={downloadTicket}>
							Download Ticket
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TicketGeneration;
