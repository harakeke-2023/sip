exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('cards').del()
  await knex('categories').del()
  await knex('users').del()
}
