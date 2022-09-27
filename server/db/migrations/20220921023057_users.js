/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary()
    table.string('auth0_id')
    table.integer('flat_id')
    table.string('name')
    table.string('description')
    table.string('img_seed')
    table.integer('rating').defaultTo(0)
    table.boolean('had_enough').defaultTo(false)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
