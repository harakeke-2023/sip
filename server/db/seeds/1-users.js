/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').insert([
    {
      id: 1,
      name: 'Maycon',
      username: 'maycon_assis',
      email: 'may.con.fa@hotmail.com',
    },
    {
      id: 2,
      name: 'Zephyr',
      username: 'zephyrz',
      email: 'zzz@hotmail.com',
    },
  ])
}
