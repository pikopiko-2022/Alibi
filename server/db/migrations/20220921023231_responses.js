/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('responses', (table) => {
    table.increments('id').primary
    table.integer('users_id')
    table.timestamp('date_responded')
    table.integer('answers_id')
  })
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('responses')
}

//adding a comment to try make the file show?
