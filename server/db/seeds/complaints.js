/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('complaints').del()
  await knex('complaints').insert([
    { id: 1, issue_id: 1 },
    { id: 2, issue_id: 2 },
    { id: 3, issue_id: 3 },
  ])
}
