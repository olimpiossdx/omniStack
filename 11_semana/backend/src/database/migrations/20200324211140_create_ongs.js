
// responsável por criar minha table
exports.up = function (knex) {
  return knex.schema.createTable('ongs', (table) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};
// responsável por delete/desfazer 
exports.down = function (knex) {
  return knex.schema.dropTabke('ongs');
};