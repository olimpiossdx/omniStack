
// responsável por criar minha table
exports.up = function (knex: { schema: { createTable: (arg0: string, arg1: (table: any) => void) => any; }; }) {
  return knex.schema.createTable('ongs', (table: any) => {
    table.string('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable();
  });
};
// responsável por delete/desfazer 
exports.down = function (knex: { schema: { dropTable: (arg0: string) => any; }; }) {
  return knex.schema.dropTable('ongs');
};
