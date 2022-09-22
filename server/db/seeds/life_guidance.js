/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('life_guidance').del()
  await knex('life_guidance').insert([
    {
      id: 1,
      issue_id: 1,
      message: `Here's a handy timer`,
      url: `https://www.timerminutes.com/7-minutes-timer`,
    },
    {
      id: 2,
      issue_id: 2,
      message: `How to hand was dishes`,
      url: `https://www.livingonadime.com/hand-wash-dishes/#:~:text=How%20To%20Hand%20Wash%20Dishes%20Rinse%20dishes%20and,%28or%20more%20if%20you%20have%20a%20large%20sink%29.`,
    },
    {
      id: 3,
      issue_id: 3,
      message: `Check out these power saving tips`,
      url: `https://www.trustpower.co.nz/your-account-and-support/getting-the-most-from-your-energy-and-data/energy-savings-tips`,
    },
  ])
}
