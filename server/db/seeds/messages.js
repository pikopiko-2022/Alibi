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
    },
    {
      id: 2,
      complaint_id: 2,
      recipient_id: 1,
      question_id: 0,
      answer_id: 0,
      life_guidance_id: 1,
    },
    {
      id: 3,
      message: 'Hi there, what do you think of billy?',
      recipient_id: 1,
    },
    {
      id: 4,
      message: 'How are you?',
      recipient_id: 2,
      sender_id: 3,
    },
    {
      id: 5,
      message: 'I hate Billy',
      recipient_id: 2,
      sender_id: 1,
    },
    {
      id: 6,
      message: 'Everyone can read this',
      sender_id: 2,
    },
    {
      id: 7,
      message: 'I really like Billy',
      recipient_id: 4,
      sender_id: 2,
    },
  ])
}
