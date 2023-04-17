/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').insert([
    {
      id: 4,
      name: 'Jiho Park',
      username: 'jiho',
      email: 'yoho4613@gmail.com',
    },
    {
      id: 3,
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
    {
      id: 1,
      name: 'Jonathan',
      username: 'Jonathan',
      email: 'dionatan.narciso@gmail.com',
    },
  ])
}
