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
    // Log the task object to verify its contents
    console.log('Creating task:', task);
  
    try {
      const [newTask] = await knex('tasks')
        .insert({
          title: task.title,
          description: task.description,
          status: task.status || 'todo', // Default to 'todo' if not provided
          due_date: task.dueDate,
          user_id: task.userId,
          created_at: new Date(), // Ensure these fields are handled correctly
          updated_at: new Date()
        })
        .returning(['id', 'title', 'description', 'status', 'due_date as dueDate', 'user_id as userId', 'created_at as createdAt', 'updated_at as updatedAt']);
  
      // Log the new task to verify the result
      console.log('New task created:', newTask);
  
      return newTask;
    } catch (err) {
      // Log the error for debugging
      console.error('Error creating task:', err);
      throw err; // Rethrow the error for higher-level handling
    }
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
    // Create a new object to map camelCase fields to snake_case fields
    const updatedFields = {
      title: taskData.title,
      description: taskData.description,
      status: taskData.status,
      due_date: taskData.dueDate, // Map dueDate to due_date
      updated_at: knex.fn.now(), // Ensure the updated_at timestamp is set
    };
  
    try {
      const [updatedTask] = await knex('tasks')
        .where({ id, user_id: userId })
        .update(updatedFields) // Use the mapped fields
        .returning([
          'id', 'title', 'description', 'status', 
          'due_date as dueDate', 'user_id as userId', 
          'created_at as createdAt', 'updated_at as updatedAt'
        ]);
  
      return updatedTask || null;
    } catch (err) {
      console.error('Error updating task:', err);
      throw err;
    }
  }
  
  

// Delete a task, ensuring it belongs to the user
export async function deleteTask(id: number, userId: number): Promise<boolean> {
  const deleted = await knex('tasks')
    .where({ id, user_id: userId })
    .del();
  return deleted > 0;
}
