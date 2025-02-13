import React, { useState } from "react";
import "./AttendeeDetails.css";

const AttendeeDetails = ({ onBack, onSubmit, ticketQuantity, initialData }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [avatar, setAvatar] = useState(null);
	const [project, setProject] = useState("");
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const handleAvatarChange = async (e) => {
		const file = e.target.files[0];

		if (!file) return;
		setLoading(true);
		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "ticket_generator_avatar");
		data.append("cloud_name", "dongyfnhc");

		const res = await fetch(
			`https://api.cloudinary.com/v1_1/dongyfnhc/image/upload`,
			{
				method: "POST",
				body: data,
			}
		);

		const uploadedImageURL = await res.json();

		setLoading(false);

		setAvatar(uploadedImageURL.url);
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
					<p>Upload Profile Photo</p>
					<div className="inner-box">
						<div className="inner-smaller-box">
							<label htmlFor="avatar-upload" className="upload-label">
								<div className="upload-icon">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										viewBox="0 0 16 16">
										<path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383" />
										<path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z" />
									</svg>
								</div>
								<div className="upload-text">
									Drag & drop or click to upload
								</div>
							</label>
						</div>
					</div>
					<input
						type="file"
						id="avatar-upload"
						className="avatar-input"
						onChange={handleAvatarChange}
						accept="image/*"
					/>
					{avatar && (
						<div className="avatar-preview">
							{loading ? (
								<p>Loading...</p>
							) : (
								<img src={avatar} alt="Avatar Preview" />
							)}
						</div>
					)}
				</div>
				{errors.avatar && <p className="error">{errors.avatar}</p>}
				<div className="horizontal-line"></div>
				<div className="form-group">
					<label htmlFor="name">Enter your name</label>
					<input
						type="text"
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						aria-label="Enter your name"
						aria-describedby="name-error"
					/>
					{errors.name && <p className="error">{errors.name}</p>}
				</div>

				<div className="form-group">
					<label htmlFor="email">Enter your email </label>
					<input
						type="email"
						id="email"
						value={email}
						placeholder="✉️  hello@avioflagos.io"
						onChange={(e) => setEmail(e.target.value)}
						aria-label="Enter your email"
						aria-describedby="email-error"
					/>
					{errors.email && <p className="error">{errors.email}</p>}
				</div>

				<div className="form-group">
					<label htmlFor="project">Special request?</label>
					<textarea
						id="project"
						className="project-textarea"
						value={project}
						placeholder="Textarea"
						arial-label="Special request"
						aria-describedby="special-request-error"
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
