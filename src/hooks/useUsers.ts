import { useState, useEffect } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "./mockApi";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "SuperAdmin" | "Admin" | "Salesman";
  password?: string;
}

export type NewUser = {
  name: string;
  email: string;
  role: "SuperAdmin" | "Admin" | "Salesman";
  password: string;
};

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  message: string | null;
  createUser: (user: NewUser) => Promise<void>;
  editUser: (user: User) => Promise<void>;
  removeUser: (id: number) => Promise<void>;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  // Load users from the API
  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch {
      setMessage("Failed to load users.");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Create a new user
  const createUser = async (user: NewUser) => {
    await handleUserRequest(async () => {
      const newUser = await addUser(user);
      setUsers((prev) => [...prev, newUser]);
      setMessage("User added successfully.");
    }, "Error adding user.");
  };

  // Edit an existing user
  const editUser = async (user: User) => {
    await handleUserRequest(async () => {
      const updated = await updateUser(user);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      setMessage("User updated successfully.");
    }, "Error updating user.");
  };

  // Remove a user by ID
  const removeUser = async (id: number) => {
    await handleUserRequest(async () => {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setMessage("User deleted successfully.");
    }, "Error deleting user.");
  };

  // Handle async request with loading and error message
  const handleUserRequest = async (
    callback: () => Promise<void>,
    errorMsg: string
  ) => {
    setLoading(true);
    setMessage(null);
    try {
      await callback();
    } catch {
      setMessage(errorMsg);
    }
    setLoading(false);
  };

  return {
    users,
    loading,
    message,
    createUser,
    editUser,
    removeUser,
    setMessage,
  };
}
