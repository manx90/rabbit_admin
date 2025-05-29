export interface User {
  id: number;
  name: string;
  email: string;
  role: "SuperAdmin" | "Admin" | "Salesman";
  password: string;
}

export type NewUser = Omit<User, "id">;

export type PartialUser = Partial<User> & { id?: number };

// Initial mock users
let users: User[] = [
  {
    id: 1,
    name: "Ali Al-Dirawi",
    email: "ali@example.com",
    role: "SuperAdmin",
    password: "12345678",
  },
  {
    id: 2,
    name: "Ahmed Taha",
    email: "ahmed@example.com",
    role: "Admin",
    password: "12345678",
  },
  {
    id: 3,
    name: "Sara Salim",
    email: "sara@example.com",
    role: "Salesman",
    password: "12345678",
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Fetch all users
export async function fetchUsers(): Promise<User[]> {
  await delay(500);
  return [...users];
}

// Add a new user
export async function addUser(newUser: NewUser): Promise<User> {
  await delay(500);
  const id = Date.now();
  const user: User = { id, ...newUser };
  users.push(user);
  return user;
}

// Update existing user
export async function updateUser(updatedUser: User): Promise<User> {
  await delay(500);
  const index = users.findIndex((u) => u.id === updatedUser.id);
  if (index === -1) {
    throw new Error("User not found");
  }
  users[index] = updatedUser;
  return updatedUser;
}

// Delete a user by ID
export async function deleteUser(id: number): Promise<void> {
  await delay(500);
  users = users.filter((u) => u.id !== id);
}
