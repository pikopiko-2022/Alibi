/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('issues').del()
  await knex('issues').insert([
    {
      id: 0,
      name: `Please select an issue`,
      details: null,
    },
    {
      id: 1,
      name: `There's no hot water left`,
      details: `I'm involuntarily doing the Wim Hof method`,
    },
    {
      id: 2,
      name: `Dishes in the sink`,
      details: `I can't make dinner because you used my favourite pan`,
    },
    {
      id: 3,
      name: `Why is the power bill so high`,
      details: `I can't afford avocados because you won't wear socks`,
    },
  ])
}
