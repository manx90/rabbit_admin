import React, { useState, useRef, useEffect } from "react";
import { useAccount } from "../Contexts/AccountContext";

function MessageTimer({ duration = 2500, onComplete }) {
	const [progress, setProgress] = useState(100);
	const startTime = useRef(Date.now());

	useEffect(() => {
		const timer = setInterval(() => {
			const elapsed = Date.now() - startTime.current;
			const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
			setProgress(remaining);

			if (remaining <= 0) {
				clearInterval(timer);
				onComplete();
			}
		}, 10);

		return () => clearInterval(timer);
	}, [duration, onComplete]);

	return (
		<div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
			<div
				className="h-full bg-current transition-all duration-100"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
}

function SystemMessage({ message, error, onClose }) {
	if (!message && !error) return null;

	// Only show system messages (not form-related)
	if (message?.toLowerCase().includes("created") || 
		message?.toLowerCase().includes("updated") || 
		message?.toLowerCase().includes("deleted")) {
		return null;
	}

	return (
		<div className="fixed top-16 right-4 z-50 max-w-md">
			<div
				className={`px-4 py-3 rounded-lg shadow-lg relative ${
					error || message?.toLowerCase().includes("error")
						? "bg-red-50 text-red-700 border border-red-200"
						: "bg-green-50 text-green-700 border border-green-200"
				} transform transition-all duration-300 ease-in-out`}
				role="alert"
			>
				<div className="flex items-center">
					{error || message?.toLowerCase().includes("error") ? (
						<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					) : (
						<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
						</svg>
					)}
					<span>{error || message}</span>
				</div>
				<MessageTimer onComplete={onClose} />
			</div>
		</div>
	);
}

function FormMessage({ message, error, onClose }) {
	if (!message && !error) return null;

	// Only show form-related messages
	if (!message?.toLowerCase().includes("created") && 
		!message?.toLowerCase().includes("updated") && 
		!message?.toLowerCase().includes("deleted")) {
		return null;
	}

	return (
		<div
			className={`mb-4 px-4 py-3 rounded-lg relative ease-linear transition-transform ${
				error || message?.toLowerCase().includes("error")
					? "bg-red-50 text-red-700 border border-red-200"
					: "bg-green-50 text-green-700 border border-green-200"
			}`}
			role="alert"
		>
			<div className="flex items-center">
				{error || message?.toLowerCase().includes("error") ? (
					<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg>
				) : (
					<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
					</svg>
				)}
				<span>{error || message}</span>
			</div>
			<MessageTimer onComplete={onClose} />
		</div>
	);
}

export default function AccountsManager() {
	const [showPassword, setShowPassword] =
		useState(false);
	const [showSystemMessage, setShowSystemMessage] = useState(true);
	const [showFormMessage, setShowFormMessage] = useState(true);
	const editModalRef = useRef(null);
	const deleteModalRef = useRef(null);

	const {
		loading,
		message,
		error,
		form,
		editModal,
		deleteModal,
		filter,
		filteredUsers,
		setFilter,
		handleChange,
		handleSubmit,
		handleEdit,
		handleEditSubmit,
		handleDelete,
		confirmDelete,
		closeEditModal,
		closeDeleteModal,
		setEditModal,
	} = useAccount();

	// Add logging for edit modal state changes
	useEffect(() => {
		console.log('Edit Modal State:', {
			isOpen: editModal.isOpen,
			user: editModal.user,
			loading
		});
	}, [editModal, loading]);

	// Add logging for form submission
	const handleEditSubmitWithLogging = async (e) => {
		e.preventDefault();
		console.log('Edit Form Submit:', {
			formData: editModal.user,
			loading
		});
		await handleEditSubmit(e);
	};

	// Add logging for edit button click
	const handleEditWithLogging = (user) => {
		console.log('Edit Button Clicked:', {
			user,
			currentEditModal: editModal
		});
		handleEdit(user);
	};

	// Add logging for edit form changes
	const handleEditFormChange = (e) => {
		const { name, value } = e.target;
		
		// Create a new user object
		const updatedUser = { ...editModal.user };
		
		// If it's the password field and it's empty, remove it
		if (name === 'password' && !value) {
			delete updatedUser.password;
		} else {
			// For other fields, update normally
			updatedUser[name] = value;
		}

		setEditModal({
			...editModal,
			user: updatedUser
		});
	};

	// Reset message visibility when new message arrives
	useEffect(() => {
		if (message || error) {
			setShowSystemMessage(true);
			setShowFormMessage(true);
		}
	}, [message, error]);

	// Handle click outside for modals
	useEffect(() => {
		function handleClickOutside(event) {
			if (editModal.isOpen && editModalRef.current && !editModalRef.current.contains(event.target)) {
				closeEditModal();
			}
			if (deleteModal.isOpen && deleteModalRef.current && !deleteModalRef.current.contains(event.target)) {
				closeDeleteModal();
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [editModal.isOpen, deleteModal.isOpen, closeEditModal, closeDeleteModal]);

	return (
		<div className="max-w-7xl mt-16 mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
			<HeaderSection />
			{showSystemMessage && (
				<SystemMessage 
					message={message} 
					error={error} 
					onClose={() => setShowSystemMessage(false)} 
				/>
			)}

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
				{/* Create Account Form */}
				<section className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
					<h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
						<span className="mr-2">
							Create New Account
						</span>
						<span className="text-blue-500">
							+
						</span>
					</h2>
					{showFormMessage && (
						<FormMessage 
							message={message} 
							error={error} 
							onClose={() => setShowFormMessage(false)} 
						/>
					)}
					<form
						onSubmit={handleSubmit}
						className="space-y-5"
					>
						<div className="space-y-2">
							<label className="block text-sm font-medium text-gray-700">
								Username
							</label>
							<input
								type="text"
								name="username"
								placeholder="Enter username"
								value={form.username}
								onChange={handleChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
								required
								disabled={loading}
							/>
						</div>
						<div className="space-y-2">
							<label className="block text-sm font-medium text-gray-700">
								Password
							</label>
							<div className="relative">
								<input
									type={
										showPassword
											? "text"
											: "password"
									}
									name="password"
									placeholder="Enter password"
									value={form.password}
									onChange={handleChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
									required
									disabled={loading}
								/>
								<button
									type="button"
									onClick={() =>
										setShowPassword(!showPassword)
									}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
									disabled={loading}
								>
									{showPassword ? (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
											/>
										</svg>
									) : (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
									)}
								</button>
							</div>
						</div>
						<div className="space-y-2">
							<label className="block text-sm font-medium text-gray-700">
								Role
							</label>
							<select
								name="role"
								value={form.role}
								onChange={handleChange}
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
								required
								disabled={loading}
							>
								<option value="SuperAdmin">
									SuperAdmin
								</option>
								<option value="Admin">
									Admin
								</option>
								<option value="Salesman">
									Salesman
								</option>
							</select>
						</div>
						<button
							type="submit"
							disabled={loading}
							className={`w-full py-3 rounded-lg text-white font-semibold ${
								loading
									? "bg-blue-300 cursor-not-allowed"
									: "bg-blue-600 hover:bg-blue-700 transform hover:scale-[1.02] active:scale-[0.98]"
							} transition-all duration-200`}
						>
							{loading
								? "Creating..."
								: "Create Account"}
						</button>
					</form>
				</section>

				{/* Accounts List */}
				<section className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
						<h2 className="text-2xl font-bold text-gray-900">
							Accounts List
						</h2>
						<div className="w-full sm:w-64">
							<input
								type="text"
								placeholder="Search accounts..."
								value={filter}
								onChange={(e) =>
									setFilter(e.target.value)
								}
								className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
								disabled={loading}
							/>
						</div>
					</div>
					<div className="overflow-x-auto rounded-lg border border-gray-200">
						<table className="w-full border-collapse text-gray-800">
							<thead>
								<tr className="bg-gray-50">
									<th className="py-4 px-4 text-left font-semibold text-gray-700">
										Username
									</th>
									<th className="py-4 px-4 text-left font-semibold text-gray-700">
										Role
									</th>
									<th className="py-4 px-4 text-left font-semibold text-gray-700">
										Actions
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{loading ? (
									<tr>
										<td
											colSpan={3}
											className="text-center py-8 text-gray-500"
										>
											Loading accounts...
										</td>
									</tr>
								) : error ? (
									<tr>
										<td
											colSpan={3}
											className="text-center py-8 text-red-500"
										>
											{error}
										</td>
									</tr>
								) : !filteredUsers?.length ? (
									<tr>
										<td
											colSpan={3}
											className="text-center py-8 text-gray-500"
										>
											No accounts found.
										</td>
									</tr>
								) : (
									filteredUsers.map((user) => (
										<tr
											key={user.id}
											className="hover:bg-gray-50 transition-colors duration-200"
										>
											<td className="py-4 px-4">
												{user.username}
											</td>
											<td className="py-4 px-4">
												<span
													className={`px-3 py-1 rounded-full text-sm font-medium
                          ${
														user.role ===
														"SuperAdmin"
															? "bg-purple-100 text-purple-800"
															: user.role ===
															  "Admin"
															? "bg-blue-100 text-blue-800"
															: "bg-green-100 text-green-800"
													}`}
												>
													{user.role}
												</span>
											</td>
											<td className="py-4 px-4">
												<div className="flex space-x-3">
													<button
														onClick={() =>
															handleEditWithLogging(user)
														}
														className="text-blue-600 cursor-pointer hover:text-blue-800 font-medium transition-colors duration-200"
														disabled={loading}
													>
														Edit
													</button>
													<button
														onClick={() =>
															handleDelete(
																user.username,
															)
														}
														className="text-red-600 cursor-pointer hover:text-red-800 font-medium transition-colors duration-200"
														disabled={loading}
													>
														Delete
													</button>
												</div>
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</section>
			</div>

			{/* Edit Modal */}
			{editModal.isOpen && (
				<div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
					<div ref={editModalRef} className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-md w-full shadow-2xl transform transition-all duration-300 scale-100">
						<h3 className="text-2xl font-bold mb-6 text-gray-900">
							Edit Account
						</h3>
						<form
							onSubmit={handleEditSubmitWithLogging}
							className="space-y-4"
						>
							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-700">
									Username
								</label>
								<input
									type="text"
									name="username"
									placeholder="Enter username"
									value={editModal.user.username}
									onChange={handleEditFormChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
									required
									disabled={loading}
								/>
							</div>
							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-700">
									New Password
								</label>
								<div className="relative">
									<input
										type={showPassword ? "text" : "password"}
										name="password"
										placeholder="Leave blank to keep current"
										value={editModal.user.password || ''}
										onChange={handleEditFormChange}
										className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
										disabled={loading}
									/>
									<button
										type="button"
										onClick={() =>
											setShowPassword(
												!showPassword,
											)
										}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
										disabled={loading}
									>
										{showPassword ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
												/>
											</svg>
										) : (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
												/>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
												/>
											</svg>
										)}
									</button>
								</div>
							</div>
							<div className="space-y-2">
								<label className="block text-sm font-medium text-gray-700">
									Role
								</label>
								<select
									name="role"
									value={editModal.user.role}
									onChange={handleEditFormChange}
									className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
									required
									disabled={loading}
								>
									<option value="SuperAdmin">
										SuperAdmin
									</option>
									<option value="Admin">
										Admin
									</option>
									<option value="Salesman">
										Salesman
									</option>
								</select>
							</div>
							<div className="flex justify-end space-x-3 mt-6">
								<button
									type="button"
									onClick={closeEditModal}
									className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
									disabled={loading}
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
									disabled={loading}
								>
									{loading
										? "Saving..."
										: "Save Changes"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{/* Delete Confirmation Modal */}
			{deleteModal.isOpen && (
				<div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 p-4">
					<div ref={deleteModalRef} className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 max-w-sm w-full shadow-2xl transform transition-all duration-300 scale-100">
						<h3 className="text-2xl font-bold mb-4 text-gray-900">
							Confirm Delete
						</h3>
						<p className="text-gray-600 mb-6">
							Are you sure you want to delete this
							account? This action cannot be
							undone.
						</p>
						<div className="flex justify-end space-x-4">
							<button
								onClick={closeDeleteModal}
								className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
								disabled={loading}
							>
								Cancel
							</button>
							<button
								onClick={confirmDelete}
								className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
								disabled={loading}
							>
								{loading
									? "Deleting..."
									: "Delete"}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

function HeaderSection() {
	return (
		<header className="text-center mb-8">
			<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
				Accounts Manager
			</h1>
			<p className="text-gray-600 text-lg">
				Create, edit, and manage user accounts
			</p>
		</header>
	);
}
