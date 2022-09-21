/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('responses').del()
  await knex('responses').insert([
    { id: 1, users_id: 1, date_responded: new Date(Date.now()), answers_id: 1 },
  ])
}
