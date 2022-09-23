/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments('id').primary
    table.integer('complaint_id')
    table.integer('recipient_id')
    table.integer('question_id')
    table.integer('answer_id')
    table.integer('life_guidance_id')
    table.timestamp('date_sent').defaultTo(knex.fn.now())
    table.timestamp('date_responded').defaultTo(knex.fn.now())
  })
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('messages')
}
