/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('responses').del()
  await knex('responses').insert([
    { id: 1, user_id: 1, date_responded: new Date(Date.now()), answer_id: 1 },
  ])
}
