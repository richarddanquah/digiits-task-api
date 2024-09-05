import knex from "../db/knex";

export interface Task {
  id?: number;
  title: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'done';
  dueDate?: Date;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create a new task
export async function createTask(task: Task): Promise<Task> {
  const [newTask] = await knex('tasks')
    .insert({ ...task })
    .returning(['id', 'title', 'description', 'status', 'due_date as dueDate', 'user_id as userId', 'created_at as createdAt', 'updated_at as updatedAt']);
  return newTask;
}

// Get a specific task by ID, ensuring it belongs to the user
export async function getTaskById(id: number, userId: number): Promise<Task | null> {
  const task = await knex('tasks')
    .where({ id, user_id: userId })
    .first();
  return task || null;
}

// Get all tasks for a specific user
export async function getTasksByUser(userId: number): Promise<Task[]> {
  const tasks = await knex('tasks')
    .where({ user_id: userId });
  return tasks;
}

// Update a task, ensuring it belongs to the user
export async function updateTask(id: number, userId: number, taskData: Partial<Task>): Promise<Task | null> {
  const [updatedTask] = await knex('tasks')
    .where({ id, user_id: userId })
    .update({ ...taskData, updated_at: knex.fn.now() })
    .returning(['id', 'title', 'description', 'status', 'due_date as dueDate', 'user_id as userId', 'created_at as createdAt', 'updated_at as updatedAt']);
  return updatedTask || null;
}

// Delete a task, ensuring it belongs to the user
export async function deleteTask(id: number, userId: number): Promise<boolean> {
  const deleted = await knex('tasks')
    .where({ id, user_id: userId })
    .del();
  return deleted > 0;
}
