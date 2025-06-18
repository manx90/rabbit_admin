import React, {
	createContext,
	useContext,
	useState,
	useEffect,
} from "react";
import useUsers from "../hooks/useUsers.jsx";

const AccountContext = createContext();

export const useAccount = () => {
	const context = useContext(AccountContext);
	if (!context) {
		throw new Error(
			"useAccount must be used within an AccountProvider",
		);
	}
	return context;
};

export const AccountProvider = ({ children }) => {
	const {
		users,
		loading,
		error,
		message,
		fetchUsers,
		createUser,
		editUser,
		removeUser,
	} = useUsers();

	const [form, setForm] = useState({
		username: "",
		password: "",
		role: "Admin",
	});

	const [editModal, setEditModal] = useState({
		isOpen: false,
		user: null,
	});

	const [deleteModal, setDeleteModal] = useState({
		isOpen: false,
		username: null,
	});

	const [filter, setFilter] = useState("");

	// Fetch users on mount
	useEffect(() => {
		console.log("Fetching users...");
		fetchUsers();
	}, []);

	// Log state changes
	useEffect(() => {
		console.log("Users state updated:", users);
	}, [users]);

	useEffect(() => {
		console.log("Message state:", message);
	}, [message]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		console.log(
			"Form field changed:",
			name,
			value,
		);
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Submitting form:", form);
		await createUser(form);
		setForm({
			username: "",
			password: "",
			role: "Admin",
		});
	};

	const handleEdit = (user) => {
		console.log(
			"Opening edit modal for user:",
			user,
		);
		setEditModal({
			isOpen: true,
			user: { ...user },
		});
	};

	const handleEditSubmit = async (e) => {
		e.preventDefault();
		console.log(
			"Submitting edit for user:",
			editModal.user,
		);
		await editUser(
			editModal.user.id,
			editModal.user,
		);
		closeEditModal();
	};

	const handleDelete = (username) => {
		console.log(
			"Opening delete modal for user:",
			username,
		);
		setDeleteModal({
			isOpen: true,
			username,
		});
	};

	const confirmDelete = async () => {
		console.log(
			"Confirming delete for user:",
			deleteModal.username,
		);
		await removeUser(deleteModal.username);
		closeDeleteModal();
	};

	const closeEditModal = () => {
		console.log("Closing edit modal");
		setEditModal({
			isOpen: false,
			user: null,
		});
	};

	const closeDeleteModal = () => {
		console.log("Closing delete modal");
		setDeleteModal({
			isOpen: false,
			username: null,
		});
	};

	// Safe filtering with null checks
	const filteredUsers =
		users?.filter((user) => {
			// console.log("Filtering user:", user); // Debug log
			if (!user) return false;
			const username = user.username || user.name; // Try both username and name fields
			if (!username) return false;
			return username
				.toLowerCase()
				.includes(filter.toLowerCase());
		}) || [];

	// console.log("Filtered users:", filteredUsers);

	const value = {
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
		setDeleteModal,
		setForm,
	};

	return (
		<AccountContext.Provider value={value}>
			{children}
		</AccountContext.Provider>
	);
};
