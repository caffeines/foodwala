exports.up = function (knex) {
  return knex.schema.createTable('User', (t) => {
    t.string('username', 150);
    t.string('password');
    t.boolean('isVerified');
    t.string('verificationCode');
    t.integer('verificationRetries');
    t.dateTime('verificationCodeGeneratedAt');
    t.string('name');
    t.dateTime('joinedAt');
    t.dateTime('updatedAt');
    t.string('address', 500);
    t.string('longitude');
    t.string('latitude');
    t.primary(['username']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('User');
};
