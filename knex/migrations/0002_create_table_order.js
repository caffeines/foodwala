exports.up = function (knex) {
  return knex.schema.createTable('Order', (t) => {
    t.string('id');
    t.string('userId');
    t.string('status');
    t.string('deliveryAddress');
    t.dateTime('createdAt');
    t.primary(['id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('Order');
};
