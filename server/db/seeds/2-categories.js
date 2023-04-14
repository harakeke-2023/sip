/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').insert([
    {
      id: 1,
      user_id: 1,
      name: 'Finances',
      description: 'Save money',
    },
    {
      id: 2,
      user_id: 2,
      name: 'Wellbeing',
      description: 'Look after yourself',
    },
    {
      id: 3,
      user_id: 1,
      name: 'Fitness',
      description: 'Stay healthy and fit',
    },
    {
      id: 4,
      user_id: 1,
      name: 'Career',
      description: 'Advance my career',
    },
    {
      id: 5,
      user_id: 1,
      name: 'Learning',
      description: 'Increase my brain power',
    },
  ])
}
