/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('complaints').del()
  await knex('complaints').insert([
    {
      id: 1,
      issue_id: 1,
      img_url: null,
      complaint_raised_by: 1,
      date_raised: new Date(Date.now()),
      culprit_id: null,
      resolved: 0,
    },
    {
      id: 2,
      issue_id: 2,
      img_url: null,
      complaint_raised_by: 2,
      date_raised: new Date(Date.now()),
      culprit_id: null,
      resolved: 0,
    },
  ])
}
