/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('questions').del()
  await knex('questions').insert([
    { id: 1, issue_id: 1, question: `When did you last wash?` },
    { id: 2, issue_id: 1, question: `How clean are you?` },
    { id: 3, issue_id: 1, question: `When did you wash your hair?` },
    {
      id: 4,
      issue_id: 1,
      question: `Have you come up with any random ideas lately?`,
    },

    { id: 5, issue_id: 1, question: `Do you have any new tunes?` },
    { id: 6, issue_id: 2, question: `What did you have for dinner?` },
    { id: 7, issue_id: 2, question: `Is that garlic I smell on your breath?` },
    // { id: 8, issue_id: 2, question: `Are you on a new diet?` },
    { id: 9, issue_id: 2, question: `What's your favourite pot?` },
    {
      id: 10,
      issue_id: 3,
      question: `What is a comfortable temperature for you?`,
    },
    {
      id: 11,
      issue_id: 3,
      question: `Are you growing your special herbs inside again...?`,
    },
    {
      id: 12,
      issue_id: 3,
      question: `Did we open a public laundromat at home?`,
    },
  ])
}
