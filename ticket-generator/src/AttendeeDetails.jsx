// AttendeeDetails.jsx
import React, { useState } from "react";
import "./AttendeeDetails.css";

const AttendeeDetails = ({ onBack, onSubmit, ticketQuantity }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [avatar, setAvatar] = useState(null);
	const [project, setProject] = useState("");
	const [errors, setErrors] = useState({});

	const handleAvatarChange = (e) => {
		const file = e.target.files[0];
		setAvatar(file);
	};

	const handleSubmit = () => {
		let newErrors = {};
		if (!name) {
			newErrors.name = "Name is required";
		}
		if (!email) {
			newErrors.email = "Email is required";
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
			newErrors.email = "Invalid email format";
		}
		if (!avatar) {
			newErrors.avatar = "Avatar is required";
		}

		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
			const formData = new FormData();
			formData.append("avatar", avatar);
			formData.append("name", name);
			formData.append("email", email);
			formData.append("project", project);

			onSubmit(formData);
		}
	};

	return (
		<div className="attendee-details">
			<div className="details-container">
				<div className="header">
					<div className="flex-header">
						<h2 className="title">Attendee Details</h2>
						<span className="step">Step 2/3</span>
					</div>
					<div className="progress-bar"></div>
				</div>

				<div className="upload-area">
					<label htmlFor="avatar-upload" className="upload-label">
						<div className="upload-icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="30"
								height="30"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#ddd"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round">
								<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
								<polyline points="17 9 12 4 7 9"></polyline>
								<line x1="12" y1="4" x2="12" y2="16"></line>
							</svg>
						</div>
						<div className="upload-text">Drag & drop or click to upload</div>
					</label>
					<input
						type="file"
						id="avatar-upload"
						className="avatar-input"
						onChange={handleAvatarChange}
						accept="image/*"
					/>
					{avatar && (
						<div className="avatar-preview">
							<img src={URL.createObjectURL(avatar)} alt="Avatar Preview" />
						</div>
					)}
					{errors.avatar && <p className="error">{errors.avatar}</p>}
				</div>

				<div className="form-group">
					<label htmlFor="name">Enter your name</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					{errors.name && <p className="error">{errors.name}</p>}
				</div>

				<div className="form-group">
					<label htmlFor="email">Enter your email *</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{errors.email && <p className="error">{errors.email}</p>}
				</div>

				<div className="form-group">
					<label htmlFor="project">About the project</label>
					<textarea
						id="project"
						className="project-textarea"
						value={project}
						onChange={(e) => setProject(e.target.value)}></textarea>
				</div>

				<div className="buttons">
					<button className="back-button" onClick={onBack}>
						Back
					</button>
					<button className="submit-button" onClick={handleSubmit}>
						Get My Free Ticket
					</button>
				</div>
			</div>
		</div>
	);
};

export default AttendeeDetails;
