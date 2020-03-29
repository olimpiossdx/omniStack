
exports.up = function (knex: { schema: { createTable: (arg0: string, arg1: (table: any) => void) => any; }; }) {
  return knex.schema.createTable('incidents', (table: any) => {
    table.increments();

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.string('ong_id').notNullable();

    table.foreign('ong_id').references('id').inTable('ongs');
  });
};

exports.down = function (knex: { schema: { dropTable: (arg0: string) => any; }; }) {
  return knex.schema.dropTable('incidents');
};
