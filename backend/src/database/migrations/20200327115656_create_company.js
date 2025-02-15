
exports.up = function(knex, Promise) {
  return knex.schema.createTable('companies', function(table) {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('companies');
};
