/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('complaints', (table) => {
    table.increments('id').primary
    table.integer('issue_id')
    table.string('img_url')
    table.integer('complaint_raised_by')
    table.timestamp('date_raised')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('complaints')
}
