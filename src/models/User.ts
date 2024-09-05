import knex from '../db/knex';
import bcrypt from 'bcrypt';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  role?: string;
}

// create user
export async function createUser(user: User): Promise<User> {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // Set a default role if none is provided
  const role = user.role || 'user';

  const [newUser] = await knex('users')
    .insert({ ...user, password: hashedPassword, role })
    .returning(['id', 'username', 'email', 'role', 'created_at', 'updated_at']);
  return newUser;
}

// find user by email
export async function findUserByEmail(email: string): Promise<User | null> {
  const user = await knex('users').where({ email }).first();
  return user || null;
}

// find user by user id
export async function findUserById(id: number): Promise<User | null> {
  const user = await knex('users').where({ id }).first();
  return user || null;
}

// Fetch all users
export async function getAllUsers(): Promise<User[]> {
  const users = await knex('users').select(
    'id',
    'username',
    'email',
    'role',
    'created_at',
    'updated_at',
  );
  return users;
}

// Update a user by ID
export async function updateUser(
  id: number,
  userData: Partial<User>,
): Promise<User | null> {
  // If there's a password in the update request, hash it before storing
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }

  const [updatedUser] = await knex('users')
    .where({ id })
    .update(userData, ['id', 'username', 'email', 'role', 'updated_at']);

  return updatedUser || null;
}

// Delete a user by ID
export async function deleteUser(id: number): Promise<boolean> {
    const deleted = await knex('users').where({ id }).del();
    return deleted > 0; // Returns true if a user was deleted, otherwise false
  }
  
