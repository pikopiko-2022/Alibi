/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('messages').del()
  await knex('messages').insert([
    {
      id: 1,
      complaint_id: 1,
      recipient_id: 2,
      question_id: 6,
      answer_id: 17,
      life_guidance_id: null,
      date_sent: new Date(Date.now()),
      date_responded: new Date(Date.now()),
    },
    {
      id: 2,
      complaint_id: 2,
      recipient_id: 1,
      question_id: 0,
      answer_id: 0,
      life_guidance_id: 1,
      date_sent: new Date(Date.now()),
      date_responded: new Date(Date.now()),
    },
  ])
}
