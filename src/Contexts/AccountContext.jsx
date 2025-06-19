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
		fetchUsers();
	}, []);

	// Log state changes
	useEffect(() => {
	}, [users]);

	useEffect(() => {
	}, [message]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await createUser(form);
		setForm({
			username: "",
			password: "",
			role: "Admin",
		});
	};

	const handleEdit = (user) => {
		
		setEditModal({
			isOpen: true,
			user: { ...user },
		});
	};

	const handleEditSubmit = async (e) => {
		e.preventDefault();
		
		await editUser(
			editModal.user.id,
			editModal.user,
		);
		closeEditModal();
	};

	const handleDelete = (username) => {
		
		setDeleteModal({
			isOpen: true,
			username,
		});
	};

	const confirmDelete = async () => {
	
		await removeUser(deleteModal.username);
		closeDeleteModal();
	};

	const closeEditModal = () => {
		setEditModal({
			isOpen: false,
			user: null,
		});
	};

	const closeDeleteModal = () => {
		setDeleteModal({
			isOpen: false,
			username: null,
		});
	};

	// Safe filtering with null checks
	const filteredUsers =
		users?.filter((user) => {
			if (!user) return false;
			const username = user.username || user.name; // Try both username and name fields
			if (!username) return false;
			return username
				.toLowerCase()
				.includes(filter.toLowerCase());
		}) || [];


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
