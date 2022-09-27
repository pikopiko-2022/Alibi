exports.seed = async (knex) => {
  await knex('users').del()
  await knex('complaints').del()
  await knex('messages').del()
}
