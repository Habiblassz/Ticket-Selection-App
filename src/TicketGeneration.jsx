import React from "react";
import "./TicketGeneration.css";
import background from "./assets/bg.png";

const TicketGeneration = ({ ticketDetails, onBookAnother, ticketQuantity }) => {
	const downloadTicket = () => {
		// const ticketContent = `
		//           Techember Fest "25
		//           User Name: ${ticketDetails.name}
		//           Ticket Type: ${ticketDetails.type}
		//           ${ticketDetails.extraInfo ? ticketDetails.extraInfo : ""}
		//           ↑ 04 Rumens road, Ikoyi, Lagos
		//           March 15, 2025 | 7:00 PM
		//       `;
		// const blob = new Blob([ticketContent], { type: "text/plain" });
		// const url = window.URL.createObjectURL(blob);
		// const a = document.createElement("a");
		// a.href = url;
		// a.download = "ticket.txt";
		// a.style.display = "none";
		// document.body.appendChild(a);
		// a.click();
		// window.URL.revokeObjectURL(url);
		// document.body.removeChild(a);
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
						<img src={background} alt="ticket" className="ticket-background" />
						<div className="ticket-details">
							<div className="event-title">Techember Fest "25</div>
							<div className="location-date">
								<p className="location">📍 04 Rumens road, Novi, Lagos</p>
								<p className="date-time">March 15, 2025 | 17:00 PM</p>
							</div>
							{ticketDetails.avatar && (
								<div className="avatar-container">
									<img
										src={ticketDetails.avatar}
										alt="User Avatar"
										className="user-avatar"
									/>
								</div>
							)}
							<div className="user-info-container">
								<div className="user-info">
									<div className="user-name">
										<div className="top">Enter your name</div>
										<div className="bottom">{ticketDetails.name}</div>
									</div>
									<div className="user-email">
										<div className="top">Enter your email*</div>
										<div className="bottom">{ticketDetails.email}</div>
									</div>
								</div>
								<div className="ticket-type-info">
									<div className="ticket-type">
										<div className="top">Ticket type</div>
										<div className="bottom">{ticketDetails.type}</div>
									</div>
									<div className="ticket-for">
										<div className="top">Ticket for: </div>
										<div className="bottom">{ticketQuantity}</div>
									</div>
								</div>
								<div className="special-request">
									<div className="request-label top">Special request?</div>
									<div className="request-text bottom">
										{ticketDetails.specialRequest || "Nil"}
									</div>
								</div>
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
