exports.up = function (knex) {
  return knex.schema.createTable('cards', (table) => {
    table.increments('id').primary()
    table.integer('category_id').references('categories.id')
    table.integer('user_id').references('users.id')
    table.string('name')
    table.string('description')
    table.integer('period')
    table.string('location')
    table.boolean('completed')
    table.integer('total_count')
    table.integer('comp_count')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('cards')
}
