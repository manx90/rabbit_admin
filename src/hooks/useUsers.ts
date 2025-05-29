import { useState, useEffect } from "react";
import { fetchUsers, addUser, updateUser, deleteUser } from "./mockApi";

export interface User {
  id: number;
  name: string;
  email: string;
  role: "SuperAdmin" | "Admin" | "Salesman";
}

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  message: string | null;
  createUser: (user: Omit<User, "id">) => Promise<void>;
  editUser: (user: User) => Promise<void>;
  removeUser: (id: number) => Promise<void>;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

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

  const createUser = async (user: Omit<User, "id">) => {
    setLoading(true);
    setMessage(null);
    try {
      const newUser = await addUser(user);
      setUsers((prev) => [...prev, newUser]);
      setMessage("User added successfully.");
    } catch {
      setMessage("Error adding user.");
    }
    setLoading(false);
  };

  const editUser = async (user: User) => {
    setLoading(true);
    setMessage(null);
    try {
      const updated = await updateUser(user);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      setMessage("User updated successfully.");
    } catch {
      setMessage("Error updating user.");
    }
    setLoading(false);
  };

  const removeUser = async (id: number) => {
    setLoading(true);
    setMessage(null);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setMessage("User deleted successfully.");
    } catch {
      setMessage("Error deleting user.");
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
