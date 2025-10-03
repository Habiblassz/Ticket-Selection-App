import { useState, useRef } from "react";
import "./TicketGeneration.css";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";

const TicketGeneration = ({ ticketDetails, onBookAnother, ticketQuantity }) => {
	const [downloading, setDownloading] = useState(false);
	const [copied, setCopied] = useState(false);
	const ticketRef = useRef();

	const downloadTicket = async () => {
		setDownloading(true);
		try {
			const ticketElement = ticketRef.current;
			const canvas = await html2canvas(ticketElement, {
				allowTaint: true,
				useCORS: true,
				scale: 2, // Higher quality
				backgroundColor: null,
			});

			const imgData = canvas.toDataURL("image/png");
			const link = document.createElement("a");
			link.href = imgData;
			link.download = `techember-ticket-${ticketDetails.name}.png`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error("Error downloading ticket:", error);
		} finally {
			setDownloading(false);
		}
	};

	const shareTicket = async () => {
		if (navigator.share) {
			try {
				const ticketElement = ticketRef.current;
				const canvas = await html2canvas(ticketElement, {
					allowTaint: true,
					useCORS: true,
					scale: 2,
				});

				const blob = await new Promise((resolve) => canvas.toBlob(resolve));
				const file = new File([blob], "ticket.png", { type: "image/png" });

				await navigator.share({
					files: [file],
					title: "My Techember Fest Ticket",
					text: `Check out my ticket for Techember Fest 2025!`,
				});
			} catch (error) {
				console.log("Sharing cancelled or failed");
			}
		} else {
			// Fallback: copy to clipboard
			try {
				await navigator.clipboard.writeText(
					`I've got my ticket for Techember Fest 2025! 🎉\nName: ${ticketDetails.name}\nEvent: Techember Fest 2025\nDate: March 15, 2025`
				);
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			} catch (error) {
				console.error("Failed to copy:", error);
			}
		}
	};

	const ticketData = JSON.stringify({
		name: ticketDetails.name,
		email: ticketDetails.email,
		type: ticketDetails.type,
		event: "Techember Fest 2025",
		date: "2025-03-15",
	});

	return (
		<div className="ticket-generation">
			<div className="generation-container">
				<div className="header">
					<div className="flex-header">
						<h2 className="title">Ticket Ready! 🎉</h2>
						<span className="step">Step 3/3</span>
					</div>
					<div className="progress-bar"></div>
				</div>

				<div className="content">
					<h2>Your Ticket is Booked!</h2>
					<p className="download-info">
						Your ticket has been generated successfully. Download it or share
						with friends!
					</p>

					<div className="ticket" ref={ticketRef}>
						<div className="ticket-details">
							<div className="event-title">Techember Fest '25</div>
							<div className="location-date">
								<p className="location">📍 04 Rumens Road, Lagos, Nigeria</p>
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
										<div className="top">Attendee Name</div>
										<div className="bottom">{ticketDetails.name}</div>
									</div>
									<div className="user-email">
										<div className="top">Email</div>
										<div className="bottom">{ticketDetails.email}</div>
									</div>
								</div>

								<div className="ticket-type-info">
									<div className="ticket-type">
										<div className="top">Ticket Type</div>
										<div className="bottom">{ticketDetails.type}</div>
									</div>
									<div className="ticket-for">
										<div className="top">Quantity</div>
										<div className="bottom">{ticketQuantity}</div>
									</div>
								</div>

								<div className="special-request">
									<div className="request-label top">Special Request</div>
									<div className="request-text bottom">
										{ticketDetails.specialRequest || "None"}
									</div>
								</div>
							</div>

							<div className="qr-code">
								<QRCodeSVG
									value={ticketData}
									size={80}
									level="M"
									includeMargin={true}
								/>
								<div className="qr-note">Scan for verification</div>
							</div>

							<div className="ticket-id">
								ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
							</div>
						</div>
					</div>

					<div className="action-buttons">
						<button
							className="share-button"
							onClick={shareTicket}
							disabled={downloading}>
							{copied ? "Copied!" : "Share Ticket"}
						</button>

						<button
							className="download-button"
							onClick={downloadTicket}
							disabled={downloading}>
							{downloading ? (
								<>
									<div className="loading-spinner"></div>
									Downloading...
								</>
							) : (
								"Download Ticket"
							)}
						</button>
					</div>

					<div className="book-another-section">
						<button className="book-another-button" onClick={onBookAnother}>
							Book Another Ticket
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TicketGeneration;
