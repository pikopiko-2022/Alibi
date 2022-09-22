/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments('id').primary
    table.integer('recipient_id')
    table.integer('question_id')
    table.integer('answer_id')
    table.integer('life_guidance_id')
    table.timestamp('date_sent')
    table.timestamp('date_responded')
  })
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('messages')
}
