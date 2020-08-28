exports.up = function (knex) {
  return knex.schema.createTable('OrderItem', (t) => {
    t.string('id');
    t.string('orderId');
    t.string('menuId');
    t.integer('quantity');
    t.primary(['id']);
    t.index(['menuId', 'orderId']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('OrderItem');
};
