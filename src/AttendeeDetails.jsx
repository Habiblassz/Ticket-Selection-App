import { useState, useEffect } from "react";
import "./AttendeeDetails.css";

const AttendeeDetails = ({ onBack, onSubmit, ticketQuantity, initialData }) => {
	const [formData, setFormData] = useState({
		name: initialData.name || "",
		email: initialData.email || "",
		project: initialData.project || "",
		avatar: initialData.avatar || null,
	});
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});
	const [loading, setLoading] = useState(false);

	// Real-time validation
	useEffect(() => {
		const newErrors = {};

		if (touched.name && !formData.name.trim()) {
			newErrors.name = "Name is required";
		} else if (touched.name && formData.name.trim().length < 2) {
			newErrors.name = "Name must be at least 2 characters";
		}

		if (touched.email && !formData.email) {
			newErrors.email = "Email is required";
		} else if (
			touched.email &&
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
		) {
			newErrors.email = "Invalid email format";
		}

		if (touched.avatar && !formData.avatar) {
			newErrors.avatar = "Profile photo is required";
		}

		setErrors(newErrors);
	}, [formData, touched]);

	const handleBlur = (field) => {
		setTouched((prev) => ({ ...prev, [field]: true }));
	};

	const handleChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const handleAvatarChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		// File validation
		const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
		const maxSize = 5 * 1024 * 1024; // 5MB

		if (!validTypes.includes(file.type)) {
			setErrors((prev) => ({
				...prev,
				avatar: "Please upload a valid image (JPEG, PNG, GIF)",
			}));
			return;
		}

		if (file.size > maxSize) {
			setErrors((prev) => ({
				...prev,
				avatar: "Image size must be less than 5MB",
			}));
			return;
		}

		setLoading(true);
		setErrors((prev) => ({ ...prev, avatar: "" }));

		try {
			const data = new FormData();
			data.append("file", file);
			data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
			data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

			const res = await fetch(
				`https://api.cloudinary.com/v1_1/${
					import.meta.env.VITE_CLOUD_NAME
				}/image/upload`,
				{
					method: "POST",
					body: data,
				}
			);

			if (!res.ok) throw new Error("Upload failed");

			const uploadedImageURL = await res.json();
			setFormData((prev) => ({ ...prev, avatar: uploadedImageURL.url }));
			setTouched((prev) => ({ ...prev, avatar: true }));
		} catch (error) {
			setErrors((prev) => ({
				...prev,
				avatar: "Failed to upload image. Please try again.",
			}));
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = () => {
		// Mark all fields as touched to show errors
		const allTouched = Object.keys(formData).reduce((acc, key) => {
			acc[key] = true;
			return acc;
		}, {});
		setTouched(allTouched);

		// Check if form is valid
		const isValid =
			!Object.values(errors).some((error) => error) &&
			Object.values(formData).every(
				(value) => value !== null && value !== undefined && value !== ""
			);

		if (isValid) {
			onSubmit(formData);
		}
	};

	const isFormValid =
		!Object.values(errors).some((error) => error) &&
		Object.values(formData).every(
			(value) => value !== null && value !== undefined && value !== ""
		);

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
									{loading ? (
										<div className="loading-spinner"></div>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											viewBox="0 0 16 16">
											<path d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383" />
											<path d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z" />
										</svg>
									)}
								</div>
								<div className="upload-text">
									{loading ? "Uploading..." : "Drag & drop or click to upload"}
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
						aria-label="upload profile photo"
					/>
					{formData.avatar && (
						<div className="avatar-preview">
							<img src={formData.avatar} alt="Avatar Preview" />
						</div>
					)}
				</div>
				{errors.avatar && (
					<p className="error" role="alert">
						{errors.avatar}
					</p>
				)}

				<div className="form-group">
					<label htmlFor="name">Enter your name</label>
					<input
						type="text"
						id="name"
						value={formData.name}
						onChange={(e) => handleChange("name", e.target.value)}
						onBlur={() => handleBlur("name")}
						aria-label="Enter your name"
						aria-invalid={errors.name ? "true" : "false"}
						className={errors.name ? "error-input" : ""}
						placeholder="John Doe"
					/>
					{errors.name && (
						<p className="error" role="alert">
							{errors.name}
						</p>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="email">Enter your email</label>
					<input
						type="email"
						id="email"
						value={formData.email}
						placeholder="✉️  hello@avioflagos.io"
						onChange={(e) => handleChange("email", e.target.value)}
						onBlur={() => handleBlur("email")}
						aria-label="Enter your email"
						aria-invalid={errors.email ? "true" : "false"}
						className={errors.email ? "error-input" : ""}
					/>
					{errors.email && (
						<p className="error" role="alert">
							{errors.email}
						</p>
					)}
				</div>

				<div className="form-group">
					<label htmlFor="project">Special request?</label>
					<textarea
						id="project"
						className="project-textarea"
						value={formData.project}
						placeholder="Any special requirements or notes..."
						aria-label="Special request"
						onChange={(e) => handleChange("project", e.target.value)}
						rows="3"></textarea>
				</div>

				<div className="buttons">
					<button className="back-button" onClick={onBack}>
						Back
					</button>
					<button
						className={`submit-button ${!isFormValid ? "disabled" : ""}`}
						onClick={handleSubmit}
						disabled={!isFormValid}>
						Get My Free Ticket
					</button>
				</div>
			</div>
		</div>
	);
};

export default AttendeeDetails;
