/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('flats').del()
  await knex('flats').insert([
    { id: 1, name: `The cool kids' pad`, address: '5 Victoria Court' },
  ])
}
