exports.up = function (knex) {
  return knex.schema.createTable('categories', (table) => {
    table.increments('id').primary()
    table.integer('user_id').references('users.id')
    table.string('name')
    table.string('description')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('categories')
}
