/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('flats', (table) => {
    table.increments('id').primary
    table.string('name')
    table.string('address')
    table.timestamp('date_established').defaultTo(knex.fn.now())
    table.timestamp('date_disolved')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('flats')
}
