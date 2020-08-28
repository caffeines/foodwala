exports.up = function (knex) {
  return knex.schema.createTable('Menu', (t) => {
    t.string('id');
    t.string('name');
    t.string('status');
    t.string('description');
    t.integer('price');
    t.dateTime('createdAt');
    t.dateTime('updatedAt');
    t.primary(['id']);
    t.unique(['name']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('Menu');
};
