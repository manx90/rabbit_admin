export interface User {
  id: number;
  name: string;
  email: string;
  role: "SuperAdmin" | "Admin" | "Salesman";
}

export type NewUser = Omit<User, "id">;

export type PartialUser = Partial<User> & { id?: number };

let users: User[] = [
  {
    id: 1,
    name: "Ali Al-Dirawi",
    email: "ali@example.com",
    role: "SuperAdmin",
  },
  {
    id: 2,
    name: "Ahmed Taha",
    email: "ahmed@example.com",
    role: "Admin",
  },
  {
    id: 3,
    name: "Sara Hussein",
    email: "sara@example.com",
    role: "Salesman",
  },
];

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function fetchUsers(): Promise<User[]> {
  await delay(500);
  return [...users];
}

export async function addUser(newUser: NewUser): Promise<User> {
  await delay(500);
  const id = Date.now();
  const user: User = { id, ...newUser };
  users.push(user);
  return user;
}

export async function updateUser(updatedUser: User): Promise<User> {
  await delay(500);
  const index = users.findIndex((u) => u.id === updatedUser.id);
  if (index === -1) {
    throw new Error("User not found");
  }
  users[index] = updatedUser;
  return updatedUser;
}

export async function deleteUser(id: number): Promise<void> {
  await delay(500);
  users = users.filter((u) => u.id !== id);
}
