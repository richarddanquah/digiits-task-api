import knex from "../db/knex";
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
    const [newUser] = await knex('users')
      .insert({ ...user, password: hashedPassword })
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