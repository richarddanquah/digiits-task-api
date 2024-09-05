import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary(); // Auto-generated unique identifier
    table.string('title', 255).notNullable(); // Task title
    table.text('description'); // Task description (optional)
    table.enu('status', ['todo', 'in-progress', 'done']).defaultTo('todo'); // Task status
    table.timestamp('due_date'); // Due date for the task (optional)
    table
      .integer('user_id')
      .unsigned()
      .notNullable() // Reference to user
      .references('id')
      .inTable('users')
      .onDelete('CASCADE'); // Foreign key constraint to users table
    table.timestamps(true, true); // created_at and updated_at timestamps
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('tasks');
}
