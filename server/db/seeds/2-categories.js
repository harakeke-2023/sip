/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    {
      id: 1,
      user_id: 1,
      name: 'Finances',
      description: 'Save money',
    },
    // {
    //   id: 2,
    //   user_id: 2,
    //   name: 'Welbeing',
    //   description: 'Look after yourself',
    // },
  ])
}
