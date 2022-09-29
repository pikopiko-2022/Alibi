/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1,
      auth0_id: 1,
      flat_id: 1,
      name: 'Gertrude',
      description: 'lazy and selfish',
      img_seed: 'https://pbs.twimg.com/media/EVU8UYAUEAI-csw.jpg',
      rating: 5,
      had_enough: false,
    },
    {
      id: 2,
      auth0_id: 2,
      flat_id: 1,
      name: 'Bartholomeow',
      description: 'uptight and controlling',
      img_seed:
        'https://imageresizer.static9.net.au/FUR-nf6ZUQBmQ_sBZvb3nRpSy58=/400x0/https%3A%2F%2Fprod.static9.net.au%2Ffs%2F06d1a684-e25e-47e9-98ce-9b18323a0f0e',
      rating: 6,
      had_enough: false,
    },
  ])
}
