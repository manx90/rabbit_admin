import { useState, useEffect } from "react";
import { Auth } from "../api/authApi";

export default function useUsers() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true); // Start with loading true
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);

	// Fetch all users
	const fetchUsers = async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await Auth.getAll();

			if (!response) {
				
				setError("No data received from server");
				setUsers([]);
				return;
			}

			// Ensure we're setting the correct data structure
			const usersData = Array.isArray(response)
				? response
				: [response];
			setUsers(usersData);
		} catch (err) {
			console.error("Error fetching users:", err);
			setError(
				err.message || "Failed to fetch users",
			);
			setUsers([]);
		} finally {
			setLoading(false);
		}
	};

	// Create new user
	const createUser = async (userData) => {
		try {
			setLoading(true);
			setError(null);
			console.log(
				"Creating user with data:",
				userData,
			); // Log the user data being sent
			const response = await Auth.createUser(
				userData,
			);
			console.log(
				"Create user response:",
				response,
			); // Log the create response

			if (!response) {
				console.error(
					"Invalid create response:",
					response,
				);
				setError("Failed to create user");
				return;
			}

			setUsers((prev) => [...prev, response]);
			setMessage("User created successfully");
		} catch (err) {
			console.error("Error creating user:", err); // Log any errors
			setError(
				err.message || "Failed to create user",
			);
		} finally {
			setLoading(false);
		}
	};

	// Edit user
	const editUser = async (id, user) => {
		try {
			setLoading(true);
			setError(null);
			const userForm = { ...user, id: undefined };
			console.log(
				"Editing user:",
				id,
				"with data:",
				userForm,
			); // Log the edit data
			const response = await Auth.updateUser(
				id,
				userForm,
			);
			console.log(
				"Edit user response:",
				response,
			); // Log the edit response

			if (!response) {
				console.error(
					"Invalid edit response:",
					response,
				);
				setError("Failed to update user");
				return;
			}

			// Ensure we keep the user's ID in the response
			// const updatedUser = { ...response, id };
			// setUsers((prev) =>
			// 	prev.map((user) =>
			// 		user.id === id
			// 			? updatedUser
			// 			: user,
			// 	),
			// );

			setMessage("User updated successfully");
      fetchUsers();
		} catch (err) {
			console.error("Error editing user:", err); // Log any errors
			setError(
				err.message || "Failed to update user",
			);
		} finally {
			setLoading(false);
		}
	};

	// Delete user
	const removeUser = async (username) => {
		try {
			setLoading(true);
			setError(null);
			console.log("Removing user:", username); // Log the user being removed
			const response = await Auth.deleteOne(
				username,
			);
			console.log(
				"Delete user response:",
				response,
			); // Log the delete response

			if (response) {
				console.error(
					"Invalid delete response:",
					response,
				);
				setError("Failed to delete user");
				return;
			}

			setUsers((prev) =>
				prev.filter((user) => user.username !== username),
			);
			setMessage("User deleted successfully");
		} catch (err) {
			console.error("Error deleting user:", err); // Log any errors
			setError(
				err.message || "Failed to delete user",
			);
		} finally {
			setLoading(false);
		}
	};

	// Fetch users on component mount
	useEffect(() => {
		console.log("Initial fetch of users"); // Log when the initial fetch happens
		fetchUsers();
	}, []);

	return {
		users,
		loading,
		message,
		error,
		setMessage,
		createUser,
		editUser,
		removeUser,
		fetchUsers,
	};
}
